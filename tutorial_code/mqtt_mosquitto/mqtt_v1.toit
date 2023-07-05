// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import net
import mqtt

CLIENT_ID ::= ""
HOST      ::= "test.mosquitto.org"

main:
  network := net.open
  transport := mqtt.TcpTransport network --host=HOST
  client := mqtt.Client --transport=transport
  client.start --client_id=CLIENT_ID

  // Client is now connected.
