// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import gpio.pwm

main:
  servo := gpio.Pin 12
  generator := pwm.Pwm --frequency=50

  // Start with the half-way angle.
  channel := generator.start servo --duty_factor=0.075
  sleep --ms=1500

  // Max angle.
  channel.set_duty_factor 0.125
  sleep --ms=1500

  // Min angle.
  channel.set_duty_factor 0.025
  sleep --ms=1500
