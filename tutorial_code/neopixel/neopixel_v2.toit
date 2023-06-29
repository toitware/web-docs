// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

/**
Implements a color wheel animation on a NeoPixel strip.
*/

import gpio
import pixel_strip show PixelStrip

WHEEL := [
  [255, 125, 0],
  [255, 255, 0],
  [125, 255, 0],
  [0, 255, 0],
  [0, 255, 125],
  [0, 255, 255],
  [0, 125, 255],
  [0, 0, 255],
  [125, 0, 255],
  [255, 0, 255],
  [255, 0, 125],
  [255, 0, 0],
]

PIXELS ::= 12
DEGREES_PER_LED ::= 30

/**
Linearily interpolates the integer values $a and $b by $t (in range 0-1.0).
*/
lerp a/int b/int t/float -> int:
  return (a + t * (b - a)).to_int

main:
  pin := gpio.Pin 13
  strip := PixelStrip.uart PIXELS --pin=pin

  r := ByteArray PIXELS
  g := ByteArray PIXELS
  b := ByteArray PIXELS

  current := 0
  while true:
    PIXELS.repeat:
      lower := (current / DEGREES_PER_LED + it) % WHEEL.size
      higher := (lower + 1) % WHEEL.size
      t := (current % DEGREES_PER_LED) / 360.0
      r[it] = lerp WHEEL[lower][0] WHEEL[higher][0] t
      g[it] = lerp WHEEL[lower][1] WHEEL[higher][1] t
      b[it] = lerp WHEEL[lower][2] WHEEL[higher][1] t

    strip.output r g b
    current -= 10
    if current < 0: current += 360
    sleep --ms=10
