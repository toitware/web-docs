// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

main:
  button := gpio.Pin 27 --input --pull-down
  led := gpio.Pin 26 --output

  while true:
    button.wait-for 1
    led.set 1
    button.wait-for 0
    led.set 0
