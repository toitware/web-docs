// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import certificate_roots
import net
import net.x509
import mqtt
import mqtt.transport as mqtt
import tls

HOST ::= "<YOUR AMAZON HOST>"
PORT ::= 8883
ROOT_CERTIFICATE ::= certificate_roots.AMAZON_ROOT_CA_1

CLIENT_ID ::= "sdk-nodejs-toit"
TOPIC ::= "sdk/test/js"

CLIENT_CERTIFICATE_DER ::= """
-----BEGIN CERTIFICATE-----
<YOUR CERTIFICATE>
-----END CERTIFICATE-----
"""

CLIENT_KEY_DER ::= """
-----BEGIN RSA PRIVATE KEY-----
<YOUR KEY>
-----END RSA PRIVATE KEY-----
"""

create_aws_transport network/net.Interface -> mqtt.Transport:
  parsed := x509.Certificate.parse CLIENT_CERTIFICATE_DER
  client_certificate := tls.Certificate parsed CLIENT_KEY_DER
  return mqtt.TcpTransport.tls network
      --host=HOST
      --port=PORT
      --root_certificates=[ROOT_CERTIFICATE]
      --certificate=client_certificate

main:
  network := net.open
  transport := create_aws_transport network
  client := mqtt.Client --transport=transport
  options := mqtt.SessionOptions --client_id=CLIENT_ID
  client.start --options=options
  client.publish TOPIC "hello".to_byte_array
  client.close
  network.close
