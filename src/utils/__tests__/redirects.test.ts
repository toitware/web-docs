// Copyright (C) 2026 Toit contributors.

import fs from "fs";
import os from "os";
import path from "path";
import vm from "vm";
import { readRedirects, validateRedirects, writeRedirectPages } from "../redirects";

let directory: string;

beforeEach(() => {
  directory = fs.mkdtempSync(path.join(os.tmpdir(), "docs-redirects-"));
});

afterEach(() => {
  fs.rmSync(directory, { recursive: true, force: true });
});

function readConfig(content: string) {
  const filename = path.join(directory, "redirects.yaml");
  fs.writeFileSync(filename, content);
  return readRedirects(filename);
}

test("normalizes and deduplicates trailing-slash aliases", () => {
  expect(readConfig("redirects:\n  /old: /new\n  /old/: /new/\n  /start: /\n")).toEqual([
    { fromPath: "/old", toPath: "/new" },
    { fromPath: "/start", toPath: "/" },
  ]);
  expect(() => readConfig("redirects:\n  /old: /new\n  /old/: /different\n")).toThrow("Conflicting");
});

test.each(["/../outside", "//external.example", "/old?query", "/old#fragment", "/old/<script>"])(
  "rejects unsafe or unsupported paths: %s",
  (fromPath) => {
    expect(() => readConfig(`redirects:\n  "${fromPath}": /new\n`)).toThrow("Invalid redirect path");
  }
);

test("rejects overwriting content, missing targets, and redirect chains", () => {
  expect(() => validateRedirects([{ fromPath: "/existing", toPath: "/new" }], ["/existing", "/new"])).toThrow(
    "replace an existing page"
  );
  expect(() => validateRedirects([{ fromPath: "/old", toPath: "/missing" }], ["/new"])).toThrow("existing page");
  expect(() =>
    validateRedirects(
      [
        { fromPath: "/old", toPath: "/intermediate" },
        { fromPath: "/intermediate", toPath: "/new" },
      ],
      ["/new"]
    )
  ).toThrow("existing page");
});

test("emits a static redirect with a no-JS fallback and preserves query and fragment in JS", () => {
  const redirects = readConfig("redirects:\n  /old/nested/: /new\n");
  validateRedirects(redirects, ["/new"]);
  writeRedirectPages(redirects, directory, "https://docs.toit.io");
  const html = fs.readFileSync(path.join(directory, "old/nested/index.html"), "utf8");
  expect(html).toContain('<meta http-equiv="refresh" content="0; url=/new">');
  expect(html).toContain('<link rel="canonical" href="https://docs.toit.io/new">');
  expect(html).toContain('<a href="/new">');
  const replace = jest.fn();
  const script = html.match(/<script>(.*?)<\/script>/)![1];
  vm.runInNewContext(script, { window: { location: { replace, search: "?source=old", hash: "#section" } } });
  expect(replace).toHaveBeenCalledWith("/new?source=old#section");
});
