// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import gpio.pwm

buzz pin --frequency --ms:
  generator := pwm.Pwm --frequency=frequency
  channel := generator.start pin --duty_factor=0.5
  sleep --ms=ms
  channel.close
  generator.close

main:
  buzzer := gpio.Pin 14
  20.repeat:
    buzz buzzer --frequency=800 --ms=500
    buzz buzzer --frequency=1600 --ms=500
  buzzer.close
