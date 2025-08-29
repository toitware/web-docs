// Copyright (C) 2025 Toit contributors.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import esp32.espnow

main:
  service := espnow.Service

  while true:
    message := service.receive
    sender := message.address
    data := message.data.to-string
    print "Received datagram from $sender: $data"
