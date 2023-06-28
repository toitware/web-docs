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

  i := 0
  while true:
    // Take the next led and turn it on for 200ms.
    led := leds[i]
    led.set 1
    sleep --ms=200
    led.set 0
    // Increment the index, wrapping around when we reach the
    // end of the list.
    i = (i + 1) % leds.size
