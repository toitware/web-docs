// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio.pwm

main:
  generator := pwm.Pwm --frequency=400
  channel := generator.start 32
  channel.set-duty-factor 0.5
  sleep --ms=10_000
  channel.close
  generator.close
