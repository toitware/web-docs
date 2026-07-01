// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio.pwm

main:
  generator := pwm.Pwm --frequency=50

  // Start with the half-way angle.
  channel := generator.start 12 --duty-factor=0.075
  sleep --ms=1500

  // Max angle.
  channel.set-duty-factor 0.125
  sleep --ms=1500

  // Min angle.
  channel.set-duty-factor 0.025
  sleep --ms=1500
