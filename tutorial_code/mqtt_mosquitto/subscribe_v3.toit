// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import mqtt
import encoding.json

CLIENT-ID ::= "toit-tutorial-ID-2023-07-06"
HOST ::= "test.mosquitto.org"
TOPIC ::= "toit-mqtt/tutorial"

main:
  routes := {
    TOPIC: :: | topic/string payload/ByteArray |
      decoded := json.decode payload
      print "Received value on '$topic': $decoded"
  }
  client := mqtt.Client --host=HOST --routes=routes
  client.start --client-id=CLIENT-ID
  // Client is now connected and subscribed to the given routes.
