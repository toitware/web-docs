// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import mqtt
import net
import certificate_roots
import encoding.json

CLIENT_ID ::= "toit-tutorial-ID-2023-07-06"
HOST ::= "test.mosquitto.org"
TOPIC ::= "toit-mqtt/tutorial"
PORT ::= 8886

main:
  network := net.open
  transport := mqtt.TcpTransport.tls network --host=HOST --port=PORT
      --root_certificates=[certificate_roots.ISRG_ROOT_X1]

  routes := {
    TOPIC: :: | topic/string payload/ByteArray |
      decoded := json.decode payload
      print "Received value on '$topic': $decoded"
  }
  client := mqtt.Client --transport=transport --routes=routes
  client.start --client_id=CLIENT_ID

  while true:
    payload := json.encode {
      "now": Time.now.utc.to_iso8601_string
    }
    client.publish TOPIC payload
    sleep --ms=1_000
