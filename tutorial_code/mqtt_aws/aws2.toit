// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate-roots
import net.x509
import mqtt
import mqtt.transport as mqtt
import tls

HOST ::= "<YOUR AMAZON HOST>"
PORT ::= 8883
ROOT-CERTIFICATE ::= certificate-roots.AMAZON-ROOT-CA-1

CLIENT-ID ::= "sdk-nodejs-toit"
TOPIC ::= "sdk/test/js"

CLIENT-CERTIFICATE-DER ::= """
-----BEGIN CERTIFICATE-----
<YOUR CERTIFICATE>
-----END CERTIFICATE-----
"""

CLIENT-KEY-DER ::= """
-----BEGIN RSA PRIVATE KEY-----
<YOUR KEY>
-----END RSA PRIVATE KEY-----
"""

main:
  parsed := x509.Certificate.parse CLIENT-CERTIFICATE-DER
  client-certificate := tls.Certificate parsed CLIENT-KEY-DER
  client := mqtt.Client.tls
      --host=HOST
      --port=PORT
      --root-certificates=[ROOT-CERTIFICATE]
      --certificate=client-certificate
  options := mqtt.SessionOptions --client-id=CLIENT-ID
  client.start --options=options
  client.publish TOPIC "hello".to-byte-array
  client.close
