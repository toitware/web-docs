// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio

main:
  led := gpio.Pin 32 --output
  while true:
    led.set 1
    sleep --ms=1
    led.set 0
    sleep --ms=1
