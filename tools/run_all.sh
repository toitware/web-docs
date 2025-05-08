#!/bin/bash

set -e

if [ -z ${TOIT_SDK+x} ]; then
  echo "TOIT_SDK is unset"
  exit 1
fi

for name in `find ../docs/ -name \*.mdx`
do
  # TODO: Fix these files.
  # bitmask needs a complete rewrite or perhaps deletion.
  # exceptions is hard to check because it throws.
  # toitdoc is hard to check because it uses quadruple backticks to escape triple backticks
  # imports is hard to check because of all the cross-references.
  if [ $name != "../docs/language/bitmask.mdx" -a \
       $name != "../docs/language/exceptions.mdx" -a \
       $name != "../docs/language/sdk/toitdoc.mdx" -a \
       $name != "../docs/language/imports.mdx" ]
  then
    echo $name
    "$TOIT_SDK/bin/toit" run run_snippets.toit -- $name
  fi
done
