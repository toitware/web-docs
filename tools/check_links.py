#!/usr/bin/env python3
# Copyright (C) 2026 Toit contributors.

"""Check internal anchor destinations in the generated site (no network needed)."""

import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.hrefs.append(href)


def main():
    public = Path(sys.argv[1] if len(sys.argv) > 1 else "public").resolve()
    pages = sorted(page for page in public.rglob("*.html") if page.is_file())
    if not (public / "index.html").is_file():
        print(f"No built site in {public}. Run yarn build first.", file=sys.stderr)
        return 1

    broken = defaultdict(set)
    for page in pages:
        route = "/" + page.relative_to(public).as_posix()
        if route.endswith("index.html"):
            route = route[:-len("index.html")]
        parser = Links()
        parser.feed(page.read_text(encoding="utf-8"))
        for href in parser.hrefs:
            url = urlsplit(urljoin("https://docs.toit.io" + route, href))
            if url.scheme not in ("http", "https") or url.netloc != "docs.toit.io":
                continue
            target = (public / unquote(url.path).lstrip("/")).resolve()
            if public not in target.parents and target != public:
                broken[url.path].add(route)
            elif not (target.is_file() or (target / "index.html").is_file()):
                broken[url.path].add(route)

    for destination, sources in sorted(broken.items()):
        print(f"Missing {destination}")
        for source in sorted(sources):
            print(f"  linked from {source}")
    if broken:
        print(f"Found {len(broken)} broken internal destinations.", file=sys.stderr)
        return 1
    print(f"Checked {len(pages)} HTML files: all internal link destinations exist.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
