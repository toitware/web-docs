// Copyright (C) 2025 Toit contributors.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import esp32.espnow

PEER ::= espnow.Address.parse "c4:dd:57:5b:f3:a8"

PMK ::= espnow.Key.from-string "pmk1234567890123"
LMK ::= espnow.Key.from-string "lmk1234567890124"

main:
  service := espnow.Service --key=PMK
  service.add-peer PEER --key=LMK

  while true:
    message := service.receive
    sender := message.address
    data := message.data.to-string
    print "Received datagram from $sender: $data"
