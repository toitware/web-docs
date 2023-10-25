// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import esp32
import gpio
import gpio.touch as gpio

main:
  pin := gpio.Pin 32
  touch := gpio.Touch pin
  touch.threshold = 800
  esp32.enable-touchpad-wakeup
  esp32.deep-sleep (Duration --m=3)
