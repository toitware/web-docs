// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate_roots
import http
import net

URL ::= "<YOUR URL>"
CERTIFICATE ::= certificate_roots.GTS_ROOT_R1

main:
  network := net.open
  client := http.Client.tls network
      --root_certificates=[CERTIFICATE]

  response := client.post_json --uri=URL {
    "timestamp": Time.now.utc.to_iso8601_string,
    "temperature": 42.0,
    "humidity": 1013.25,
  }

  if response.status_code != 200:
    print "Request failed: $response.status_code $response.status_message"

  response.drain
