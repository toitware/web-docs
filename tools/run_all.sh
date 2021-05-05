#!/bin/bash

set -e

for name in `find ../docs/ -name \*.mdx`
do
  # TODO: Fix these files.
  # bitmask needs a complete rewrite or perhaps deletion.
  # exceptions is hard to check because it throws.
  # toitdoc is hard to check because it uses quadruple backticks to escape triple backticks
  if [ $name != "../docs/sensors/drivers/bitmask.mdx" -a \
       $name != "../docs/language/exceptions.mdx" -a \
       $name != "../docs/sdk/toitdoc.mdx" ]
  then
    echo $name
    ../../toit/build/release/bin/toitvm run_snippets.toit $name
  fi
done
