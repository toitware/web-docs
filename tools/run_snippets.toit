// Copyright (C) 2021 Toitware ApS. All rights reserved.

import host.file
import host.pipe
import host.os
import reader

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

DEFAULT_OUTPUT ::= "snippet.toit"

THINGS_THAT_WONT_RUN_ON_SERVER ::= [
  "import gpio",
  "import pixel_display",
  "import mqtt",
  "import ble",
  "import esp32",
  "import system.containers",
]

main args -> none:
  mdfile := args[0]

  r := reader.BufferedReader
    file.Stream.for_read mdfile

  s := State 0

  skip := false
  hidden/string? := null
  HIDDEN_PRE ::= "<!-- HIDDEN CODE "
  HIDDEN_POST ::= " -->"
  FILENAME_PRE ::= "<!-- CODE FILENAME "
  FILENAME_POST ::= " -->"

  allow_warning := false
  while line := r.read_line:
    if line.contains " CODE " and line.contains "--" and not line.contains "<!--":
      throw "Malformed HTML comment at line $s.line_number"
    if line.contains "<!-- RESET CODE":
      s.run
    if not s.check_only: s.check_only = line.contains "<!-- ANALYZE CODE -->"
    if not s.allow_warning: s.allow_warning = line.contains "<!-- ALLOW WARNING -->"
    if not skip: skip = line.contains "<!-- SKIP CODE"
    if line.starts_with HIDDEN_PRE and line.ends_with HIDDEN_POST:
      hidden = line[HIDDEN_PRE.size .. line.size - HIDDEN_POST.size]
    if line.starts_with FILENAME_PRE and line.ends_with FILENAME_POST:
      fn := line[FILENAME_PRE.size .. line.size - FILENAME_POST.size]
      fn.do --runes:
        if not 'a' <= it <= 'z' and not '0' <= it <= '9' and not ['.', '-', '_'].contains it:
          throw "Illegal filename in .mdx file"
      s.run
      s.snippet_filename = fn
    if s.code_segment_marker and line.starts_with s.code_segment_marker:
      // We've reached the end of a code segment.
      s.code_segment_marker = null
      line = ""
      s.in_toit_code = false
      skip = false
    else if line == "```" or line == "```toit" or line == "``` toit":
      s.code_segment_marker = "```"
      line = ""
      // If skip is true, treat the code segment as non-toit code.
      s.in_toit_code = not skip
    else if line.starts_with "```":
      // We assume that ```` is not toit code.
      s.code_segment_marker = line.starts_with "````" ? "````" : "```"
      line = ""
      s.in_toit_code = false

    if s.in_toit_code:
      if line.contains "rror" and line.ends_with "!":
        line = ""
    else:
      line = ""
    if hidden:
      line = hidden
      hidden = null
    if line.starts_with "import ":
      if s.has_seen_non_import:
        s.run
    else if line != "" and not (line.starts_with "//"):
      s.has_seen_non_import = true
    dots_index := line.index_of "..."
    if dots_index >= 0:
      line = line[0..dots_index] + "/**/" + line[dots_index + 3..]
    s.add line
    if s.program.size != s.line_number: "Throw $s.program.size != $s.line_number"
  s.run

class State:
  code_segment_marker/string? := null
  in_toit_code/bool := false
  has_seen_non_import/bool := false
  check_only/bool := false
  line_number/int := ?
  program/List := ?
  snippet_filename/string? := null
  allow_warning/bool := false

  add line/string -> none:
    program.add line
    THINGS_THAT_WONT_RUN_ON_SERVER.do:
      if line.starts_with it: check_only = true
    line_number++

  constructor .line_number:
    program = List line_number: ""

  run:
    werror_flag := allow_warning ? "" : "-Werror"
    toit_sdk := os.env.get "TOIT_SDK"
    if not toit_sdk:
      throw "TOIT_SDK environment variable not set"
    toitc := "$toit_sdk/bin/toit.compile"
    toitvm := "$toit_sdk/bin/toit.run"
    filename := snippet_filename ? snippet_filename : DEFAULT_OUTPUT
    snippet_filename = null
    snippet := file.Stream.for_write filename
    mains := 0
    program.do: if it.starts_with "main": mains++
    if mains > 1:
      i := mains
      program.map --in_place:
        if it.starts_with "main":
          i--
          "main$i$it[4..]"
        else:
          it
    program.do: snippet.write "$it\n"
    if mains != 1:
      snippet.write "main:\n"
    if mains > 1:
      mains.repeat:
        snippet.write "  main$it\n"
    snippet.close
    result := ?
    if check_only:
      result = pipe.system "$toitc --analyze $werror_flag $filename"
    else:
      result = pipe.system "$toitvm $werror_flag $filename"
    check_only = false
    if result != 0:
      throw "Failure for $filename"
    if filename == DEFAULT_OUTPUT:
      file.delete filename

    program = List line_number: ""
    has_seen_non_import = false
    allow_warning = false
