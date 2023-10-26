// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import http
import net
import certificate-roots
import encoding.json

URL ::= "uselessfacts.jsph.pl"
PATH ::= "/random.json?language=en"
CERTIFICATE ::= certificate-roots.ISRG-ROOT-X1

main:
  network := net.open
  client := http.Client.tls network
      --root-certificates=[CERTIFICATE]

  request := client.get URL PATH
  decoded := json.decode-stream request.body
  print decoded["text"]
