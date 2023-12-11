// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import mqtt

CLIENT-ID ::= ""
HOST ::= "test.mosquitto.org"

main:
  client := mqtt.Client --host=HOST
  client.start --client-id=CLIENT-ID
  // Client is now connected.
