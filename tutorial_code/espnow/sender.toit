// Copyright (C) 2025 Toit contributors.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import esp32.espnow

main:
  service := espnow.Service
  service.add-peer espnow.BROADCAST-ADDRESS

  counter := 0
  while true:
    message := "hello $counter"
    service.send message
        --address=espnow.BROADCAST-ADDRESS
    print "Sent datagram."
    counter++
    sleep --ms=1000
