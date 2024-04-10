// Copyright (C) 2021 Toitware ApS. All rights reserved.

import host.file
import host.pipe
import host.os

// Give it an .mdx file on the command line, and it writes the code
// snippets to snippets.toit and tries to run them.
//
// Notes:
// It looks for ``` to delimit the Toit code.  If there is a
//   language name after the opening ``` it assumes it's not Toit
//   code and skips it.
// It tries to match the line numbers in the source and in the snippets.toit
//   file.
// The toitvm command is hard coded (below).
// Methods named `main` are renamed so you can have several of them.
// Classes and other methods are not renamed.
// If it encounters a line that contains: <!-- RESET CODE -->, then
//   it runs all the Toit code found so far, and starts over.  It also
//   does this with lines that start with `import`.
// If it encounters a line that consists of <!-- HIDDEN CODE something -->
//   then it inserts that into the snippet file to run.
// If it encounters a line that contains: <!-- SKIP CODE -->, then
//   the next snippet between ```'s is ignored.
// If it encounters a line that contains: <!-- ANALYZE CODE -->, then
//   the next time we invoke the Toit compiler we do so in --analyze mode
//   where the code is analyzed, but not run.
// If it encounters a line that contains: <!-- ALLOW WARNING -->, then
//   the next time we invoke the Toit compiler we do so without -Werror
// Ellipses in the code are replaced by /**/

DEFAULT-OUTPUT ::= "snippet.toit"

THINGS-THAT-WONT-RUN-ON-SERVER ::= [
  "import gpio",
  "import pixel-display",
  "import mqtt",
  "import ble",
  "import esp32",
  "import system.containers",
  "import net.cellular",
  "import watchdog",
  "import qubitro",
  "import qubitro.service",
]

main args -> none:
  mdfile := args[0]

  stream := file.Stream.for-read mdfile
  r := stream.in

  s := State 0

  skip := false
  hidden/string? := null
  HIDDEN-PRE ::= "<!-- HIDDEN CODE "
  HIDDEN-POST ::= " -->"
  FILENAME-PRE ::= "<!-- CODE FILENAME "
  FILENAME-POST ::= " -->"

  allow-warning := false
  while line := r.read-line:
    if line.contains " CODE " and line.contains "--" and not line.contains "<!--":
      throw "Malformed HTML comment at line $s.line-number"
    if line.contains "<!-- RESET CODE":
      s.run
    if not s.check-only: s.check-only = line.contains "<!-- ANALYZE CODE -->"
    if not s.allow-warning: s.allow-warning = line.contains "<!-- ALLOW WARNING -->"
    if not s.no-rename-main: s.no-rename-main = line.contains "<!-- NO RENAME MAIN -->"
    if not skip: skip = line.contains "<!-- SKIP CODE"
    if line.starts-with HIDDEN-PRE and line.ends-with HIDDEN-POST:
      hidden = line[HIDDEN-PRE.size .. line.size - HIDDEN-POST.size]
    if line.starts-with FILENAME-PRE and line.ends-with FILENAME-POST:
      fn := line[FILENAME-PRE.size .. line.size - FILENAME-POST.size]
      fn.do --runes:
        if not 'a' <= it <= 'z' and not '0' <= it <= '9' and not ['.', '-', '_'].contains it:
          throw "Illegal filename in .mdx file"
      s.run
      s.snippet-filename = fn
    if s.code-segment-marker and line.starts-with s.code-segment-marker:
      // We've reached the end of a code segment.
      s.code-segment-marker = null
      line = ""
      s.in-toit-code = false
      skip = false
    else if line == "```" or line == "```toit" or line == "``` toit":
      s.code-segment-marker = "```"
      line = ""
      // If skip is true, treat the code segment as non-toit code.
      s.in-toit-code = not skip
    else if line.starts-with "```":
      // We assume that ```` is not toit code.
      s.code-segment-marker = line.starts-with "````" ? "````" : "```"
      line = ""
      s.in-toit-code = false

    if s.in-toit-code:
      if line.contains "rror" and line.ends-with "!":
        line = ""
    else:
      line = ""
    if hidden:
      line = hidden
      hidden = null
    if line.starts-with "import ":
      if s.has-seen-non-import:
        s.run
    else if line != "" and not (line.starts-with "//"):
      s.has-seen-non-import = true
    dots-index := line.index-of "..."
    if dots-index >= 0:
      line = line[0..dots-index] + "/**/" + line[dots-index + 3..]
    s.add line
    if s.program.size != s.line-number: "Throw $s.program.size != $s.line-number"
  s.run
  stream.close

class State:
  code-segment-marker/string? := null
  in-toit-code/bool := false
  has-seen-non-import/bool := false
  check-only/bool := false
  line-number/int := ?
  program/List := ?
  snippet-filename/string? := null
  allow-warning/bool := false
  no-rename-main/bool := false

  add line/string -> none:
    program.add line
    THINGS-THAT-WONT-RUN-ON-SERVER.do:
      if line.starts-with it: check-only = true
    line-number++

  constructor .line-number:
    program = List line-number: ""

  run:
    werror-flag := allow-warning ? "" : "-Werror"
    toit-sdk := os.env.get "TOIT_SDK"
    if not toit-sdk:
      throw "TOIT_SDK environment variable not set"
    toitc := "$toit-sdk/bin/toit.compile"
    toitvm := "$toit-sdk/bin/toit.run"
    kebabify := "$toit-sdk/tools/kebabify"
    filename := snippet-filename ? snippet-filename : DEFAULT-OUTPUT
    snippet-filename = null
    snippet := file.Stream.for-write filename
    snippet-writer := snippet.out
    mains := 0
    program.do: if it.starts-with "main": mains++
    if mains > 1 and not no-rename-main:
      i := mains
      program.map --in-place:
        if it.starts-with "main":
          i--
          "main$i$it[4..]"
        else:
          it
    program.do: snippet-writer.write "$it\n"
    if not no-rename-main:
      if mains != 1:
        snippet-writer.write "main:\n"
      if mains > 1:
        mains.repeat:
          snippet-writer.write "  main$it\n"
    snippet.close
    result := ?
    if check-only:
      result = pipe.system "$toitc --analyze $werror-flag $filename"
    else:
      result = pipe.system "$toitvm $werror-flag $filename"
    before-kebabify := file.read-content filename
    pipe.system "$kebabify code $filename --toitc $toitc"
    after-kebabify := file.read-content filename
    if before-kebabify != after-kebabify:
      throw "Kebabify changed the file $filename"
    check-only = false
    if result != 0:
      throw "Failure for $filename"
    if filename == DEFAULT-OUTPUT:
      file.delete filename

    program = List line-number: ""
    has-seen-non-import = false
    allow-warning = false
