// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import pixel-strip show PixelStrip

PIXELS ::= 12

main:
  pin := gpio.Pin 13
  strip := PixelStrip.uart PIXELS --pin=pin

  r := ByteArray PIXELS
  g := ByteArray PIXELS
  b := ByteArray PIXELS

  current := 0
  while true:
    // Decrease intensity of all LEDs.
    PIXELS.repeat:
      r[it] = r[it] / 3
      g[it] = g[it] / 3
      b[it] = b[it] / 3

    // Set the current LED to full brightness.
    r[current] = 255
    g[current] = 255
    b[current] = 255

    // Show the current configuration.
    strip.output r g b

    // Sleep.
    sleep --ms=70

    // Prepare for the next round.
    current = (current + 1) % PIXELS
