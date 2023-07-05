// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import mqtt
import net
import encoding.json

CLIENT_ID ::= "toit-tutorial-ID-2023-07-06"
HOST ::= "test.mosquitto.org"
TOPIC ::= "toit-mqtt/tutorial"

main:
  network := net.open
  transport := mqtt.TcpTransport network --host=HOST
  routes := {
    TOPIC: :: | topic/string payload/ByteArray |
      decoded := json.decode payload
      print "Received value on '$topic': $decoded"
  }
  client := mqtt.Client --transport=transport --routes=routes
  client.start --client_id=CLIENT_ID
  // Client is now connected and subscribed to the given routes.
