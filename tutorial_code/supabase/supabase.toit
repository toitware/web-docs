// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate_roots
import supabase

TABLE ::= "temperatures"
PROJECT_ID ::= "<project-id>"
ANON_KEY ::= "<anon-key>"

DEVICE_ID ::= "<device-id>"

main:
  host := "$(PROJECT_ID).supabase.co"
  client := supabase.Client.tls
      --host=host
      --anon=ANON_KEY
      --root_certificates=[certificate_roots.BALTIMORE_CYBERTRUST_ROOT]

  // We don't want to receive the inserted row, because we don't have
  // read access to the table.
  client.rest.insert TABLE --no-return_inserted {
    "device_id": DEVICE_ID,
    "temperature": 42.0,
  }

  client.close
