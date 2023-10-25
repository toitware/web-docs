// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import host.os

main:
  api-key := os.env.get "API_KEY"
  if not api-key or api-key == "":
    print "Please set the API_KEY environment variable."
    return

  main api-key

main api-key:
  print "Using the API_KEY now: $api-key"
