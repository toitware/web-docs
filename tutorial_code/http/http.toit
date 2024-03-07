// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import http
import net
import certificate-roots
import encoding.json

URL ::= "uselessfacts.jsph.pl"
PATH ::= "/random.json?language=en"

main:
  certificate-roots.install-common-trusted-roots

  network := net.open
  client := http.Client.tls network

  request := client.get URL PATH
  decoded := json.decode-stream request.body
  print decoded["text"]
