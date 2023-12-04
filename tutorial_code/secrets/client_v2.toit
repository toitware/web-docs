// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import .secrets

main:
  secret-api-key := API-KEY  // Imported from secrets.
  print "Using the API_KEY now: $secret-api-key"
