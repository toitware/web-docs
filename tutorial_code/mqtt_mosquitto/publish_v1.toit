// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import mqtt
import encoding.json

CLIENT-ID ::= ""  // Use a random client ID.
HOST ::= "test.mosquitto.org"
TOPIC ::= "toit-mqtt/tutorial"

main:
  client := mqtt.Client --host=HOST
  client.start --client-id=CLIENT-ID

  payload := json.encode {
    "value": 42
  }
  client.publish TOPIC payload
  client.close
