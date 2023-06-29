// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

main:
  sensor := gpio.Pin 27 --input
  led := gpio.Pin 26 --output

  while true:
    sensor.wait_for 0
    led.set 1
    sensor.wait_for 1
    led.set 0
