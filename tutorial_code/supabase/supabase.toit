// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate-roots
import supabase

TABLE ::= "temperatures"
PROJECT-ID ::= "<project-id>"
ANON-KEY ::= "<anon-key>"

DEVICE-ID ::= "<device-id>"

main:
  certificate-roots.install-common-trusted-roots
  host := "$(PROJECT-ID).supabase.co"
  client := supabase.Client.tls
      --host=host
      --anon=ANON-KEY

  // We don't want to receive the inserted row, because we don't have
  // read access to the table.
  client.rest.insert TABLE --no-return-inserted {
    "device_id": DEVICE-ID,
    "temperature": 42.0,
  }

  client.close
