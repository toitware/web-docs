// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio
import gpio.pwm

main:
  led := gpio.Pin 32
  generator := pwm.Pwm --frequency=400
  channel := generator.start led
  channel.set_duty_factor 0.5
  sleep --ms=10_000
  channel.close
  generator.close
  led.close
