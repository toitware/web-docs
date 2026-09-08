// Copyright (C) 2026 Toit contributors.

import fs from "fs";
import yaml from "js-yaml";
import path from "path";

export type Redirect = { fromPath: string; toPath: string };

export function readRedirects(filename: string): Redirect[] {
  const config = yaml.load(fs.readFileSync(filename, "utf8")) as { redirects: Record<string, string> };
  const redirects = new Map<string, string>();
  const normalize = (value: string) => {
    // Restrict this map to local page paths, with no query, fragment, or traversal.
    if (
      typeof value !== "string" ||
      !/^\/[a-zA-Z0-9_./-]*$/.test(value) ||
      value.includes("//") ||
      value.split("/").some((segment) => segment === "." || segment === "..")
    ) {
      throw new Error(`Invalid redirect path: ${value}`);
    }
    return value.replace(/\/$/, "") || "/";
  };
  for (const [from, to] of Object.entries(config.redirects)) {
    const fromPath = normalize(from);
    const toPath = normalize(to);
    if (redirects.has(fromPath) && redirects.get(fromPath) !== toPath) {
      throw new Error(`Conflicting redirects for ${fromPath}`);
    }
    redirects.set(fromPath, toPath);
  }
  return Array.from(redirects, ([fromPath, toPath]) => ({ fromPath, toPath }));
}

export function validateRedirects(redirects: Redirect[], pagePaths: string[]): void {
  const pages = new Set(pagePaths);
  for (const { fromPath, toPath } of redirects) {
    if (pages.has(fromPath)) {
      throw new Error(`Redirect would replace an existing page: ${fromPath}`);
    }
    if (!pages.has(toPath)) {
      throw new Error(`Redirect ${fromPath} must target an existing page: ${toPath}`);
    }
  }
}

export function writeRedirectPages(redirects: Redirect[], publicDir: string, siteUrl: string): void {
  for (const { fromPath, toPath } of redirects) {
    const directory = path.join(publicDir, fromPath);
    // Paths are validated by readRedirects, so they are also safe in HTML and JS.
    // The root-relative target keeps preview deployments on their own origin.
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Page moved</title>
  <link rel="canonical" href="${new URL(toPath, siteUrl).href}">
  <script>window.location.replace(${JSON.stringify(toPath)} + window.location.search + window.location.hash);</script>
  <meta http-equiv="refresh" content="0; url=${toPath}">
</head>
<body>
  <p>This page has moved to <a href="${toPath}">${toPath}</a>.</p>
</body>
</html>
`;
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, "index.html"), html);
  }
}
