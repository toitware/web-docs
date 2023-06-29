// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import gpio.pwm

main:
  led := gpio.Pin 32
  generator := pwm.Pwm --frequency=400
  channel := generator.start led
  duty_percent := 0
  step := 1
  while true:
    channel.set_duty_factor duty_percent/100.0
    duty_percent += step
    if duty_percent == 0 or duty_percent == 100:
      step = -step
    sleep --ms=10
