// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate-roots
import http
import net

URL ::= "https://script.google.com/macros/s/AKfycbyZqjODR6oskcJ8cdMZL_bfipPtz_GioQdFhEXYSRv3a98DzkEbP5ld85HsPZ7xov48NQ/exec" // <YOUR URL>"

main:
  certificate-roots.GTS-ROOT-R1.install
  network := net.open
  client := http.Client.tls network

  response := client.post-json --no-follow-redirects --uri=URL {
    "timestamp": Time.now.utc.to-iso8601-string,
    "temperature": 42.0,
    "humidity": 1013.25,
  }

  if response.status-code != 200 and response.status-code != 302:
    print "Request failed: $response.status-code $response.status-message"

  response.drain
