// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import esp32
import gpio.touch as gpio

main:
  touch := gpio.Touch 32
  touch.threshold = 800
  esp32.enable-touchpad-wakeup
  esp32.deep-sleep (Duration --m=3)
