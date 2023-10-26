// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import gpio.pwm

main:
  led := gpio.Pin 32
  generator := pwm.Pwm --frequency=400
  channel := generator.start led
  duty-percent := 0
  step := 1
  while true:
    channel.set-duty-factor duty-percent/100.0
    duty-percent += step
    if duty-percent == 0 or duty-percent == 100:
      step = -step
    sleep --ms=10
