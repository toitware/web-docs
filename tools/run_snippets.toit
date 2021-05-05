// Copyright (C) 2021 Toitware ApS. All rights reserved.

import server.file as file
import server.pipe as pipe
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
// Ellipses in the code are replaced by /**/

TOITVM ::= "../../toit/build/release/bin/toitvm"
TOITC ::= "../../toit/build/release/bin/toitc"
DEFAULT_OUTPUT ::= "snippet.toit"

THINGS_THAT_WONT_RUN_ON_SERVER ::= [
  "import gpio",
  "import pixel_display",
  "import pubsub",
]

main args -> none:
  mdfile := args[0]

  r := reader.BufferedReader
    file.Stream.read mdfile

  s := State 0

  skip := false
  hidden/string? := null
  HIDDEN_PRE ::= "<!-- HIDDEN CODE "
  HIDDEN_POST ::= " -->"
  FILENAME_PRE ::= "<!-- CODE FILENAME "
  FILENAME_POST ::= " -->"

  while line := r.read_line:
    if line.contains " CODE " and line.contains "--" and not line.contains "<!--":
      throw "Malformed HTML comment at line $s.line_number"
    if line.contains "<!-- RESET CODE":
      s.run
    if not s.check_only: s.check_only = line.contains "<!-- ANALYZE CODE -->"
    if not skip: skip = line.contains "<!-- SKIP CODE"
    if line.starts_with HIDDEN_PRE and line.ends_with HIDDEN_POST:
      hidden = line[HIDDEN_PRE.size .. line.size - HIDDEN_POST.size]
    if line.starts_with FILENAME_PRE and line.ends_with FILENAME_POST:
      fn := line[FILENAME_PRE.size .. line.size - FILENAME_POST.size]
      fn.do --runes:
        if not 'a' <= it <= 'z' and not ['.', '-', '_'].contains it:
          throw "Illegal filename in .mdx file"
      s.run
      s.snippet_filename = fn
    if (line == "```" or line == "```toit") and not skip:
      line = ""
      if s.in_non_toit_code:
        s.in_non_toit_code = false
      else:
        s.in_toit_code = not s.in_toit_code
    else if line.starts_with "```":
      s.in_non_toit_code = true
      skip = false
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
  in_toit_code/bool := false
  in_non_toit_code/bool := false
  has_seen_non_import/bool := false
  check_only/bool := false
  line_number/int := ?
  program/List := ?
  snippet_filename/string? := null

  add line/string -> none:
    program.add line
    THINGS_THAT_WONT_RUN_ON_SERVER.do:
      if line.starts_with it: check_only = true
    line_number++

  constructor .line_number:
    program = List line_number: ""

  run:
    filename := snippet_filename ? snippet_filename : DEFAULT_OUTPUT
    snippet_filename = null
    snippet := file.Stream.write filename
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
      result = pipe.system "$TOITC --analyze $filename"
    else:
      result = pipe.system "$TOITVM $filename"
    check_only = false
    if result != 0:
      throw "Failure for $filename"
    if filename == DEFAULT_OUTPUT:
      file.delete filename

    program = List line_number: ""
    has_seen_non_import = false
