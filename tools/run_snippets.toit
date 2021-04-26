// Copyright (C) 2021 Toitware ApS. All rights reserved.

import file
import pipe
import reader

// Give it a .md file on the command line, and it writes the code
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
//   it runs all the Toit code found so far, and starts over.
// If it encounters a line that consists of <!-- HIDDEN CODE something -->
//   then it inserts that into the snippet file to run.
// If it encounters a line that contains: <!-- SKIP CODE -->, then
//   the next snippet between ```'s is ignored.
// If it encounters a line that contains: <!-- ANALYZE CODE -->, then
//   the next time we invoke the Toit compiler we do so in --analyze mode
//   where the code is analyzed, but not run.
// Ellipses in the code are replaced by /**/

TOITVM ::= "./build/release/bin/toitvm"
TOITC ::= "./build/release/bin/toitc"
OUTPUT ::= "snippet.toit"

analyze_code := false

main args -> none:
  mdfile := args[0]

  r := reader.BufferedReader
    file.Stream.read mdfile

  in_non_toit_code := false
  in_backquotes := false
  line_number := 0
  program := []
  main_count := 0
  skip := false
  hidden/string? := null
  HIDDEN_PRE ::= "<!-- HIDDEN CODE "
  HIDDEN_POST ::= " -->"

  while line := r.read_line:
    if line.contains " CODE " and line.contains "--" and not line.contains "<!--":
      throw "Malformed HTML comment at line $line_number"
    reset := line.contains "<!-- RESET CODE"
    if not analyze_code: analyze_code = line.contains "<!-- ANALYZE CODE -->"
    if not skip: skip = line.contains "<!-- SKIP CODE"
    if line.starts_with HIDDEN_PRE and line.ends_with HIDDEN_POST:
      hidden = line[HIDDEN_PRE.size .. line.size - HIDDEN_POST.size]
    if (line == "```" or line == "```toit") and not skip:
      line = ""
      if in_non_toit_code:
        in_non_toit_code = false
      else:
        in_backquotes = not in_backquotes
    else if line.starts_with "```":
      in_non_toit_code = true
      skip = false
    if in_backquotes:
      if line.contains "rror" and line.ends_with "!":
        line = ""
    else:
      line = ""
    if hidden:
      line = hidden
      hidden = null
    dots_index := line.index_of "..."
    if dots_index >= 0:
      line = line[0..dots_index] + "/**/" + line[dots_index + 3..]
    program.add line
    line_number++
    if program.size != line_number: "Throw $program.size != $line_number"
    if reset:
      run program
      program = List line_number: ""
  run program

run program/List:
  snippet := file.Stream.write OUTPUT
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
  if analyze_code:
    result = pipe.system "$TOITC --analyze $OUTPUT"
  else:
    result = pipe.system "$TOITVM $OUTPUT"
  analyze_code = false
  if result != 0:
    throw "Failure for $OUTPUT"
  file.delete OUTPUT
