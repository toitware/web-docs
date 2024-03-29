// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import mqtt
import certificate-roots
import encoding.json

CLIENT-ID ::= "toit-tutorial-ID-2023-07-06"
HOST ::= "test.mosquitto.org"
TOPIC ::= "toit-mqtt/tutorial"

main:
  certificate-roots.install-common-trusted-roots

  routes := {
    TOPIC: :: | topic/string payload/ByteArray |
      decoded := json.decode payload
      print "Received value on '$topic': $decoded"
  }
  client := mqtt.Client.tls --host=HOST --routes=routes
  client.start --client-id=CLIENT-ID

  while true:
    payload := json.encode {
      "now": Time.now.utc.to-iso8601-string
    }
    client.publish TOPIC payload
    sleep --ms=1_000
