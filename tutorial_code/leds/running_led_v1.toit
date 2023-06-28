// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio

main:
  leds := [
    gpio.Pin 32 --output,
    gpio.Pin 33 --output,
    gpio.Pin 25 --output,
    gpio.Pin 26 --output,
  ]

  // Turn each LED on for 500ms.
  leds.do:
    it.set 1
    sleep --ms=500
    it.set 0

  // Shut down each pin.
  leds.do: it.close
