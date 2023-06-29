// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

main:
  leds := [
    gpio.Pin 32 --output,
    gpio.Pin 33 --output,
    gpio.Pin 25 --output,
    gpio.Pin 26 --output,
  ]

  while true:
    // Turn each LED on for 200ms.
    leds.do:
      it.set 1
      sleep --ms=200
      it.set 0
