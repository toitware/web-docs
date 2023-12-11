// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate-roots
import mqtt
import net.x509
import tls

HOST ::= "<YOUR AMAZON HOST>"

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

create-aws-certificate -> tls.Certificate:
  parsed := x509.Certificate.parse CLIENT-CERTIFICATE-DER
  return tls.Certificate parsed CLIENT-KEY-DER

main:
  certificate-roots.install-common-trusted-roots
  client := mqtt.Client.tls
      --host=HOST
      --certificate=create-aws-certificate
  options := mqtt.SessionOptions --client-id=CLIENT-ID
  client.start --options=options
  client.publish TOPIC "hello".to-byte-array
  client.close
