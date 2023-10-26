// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import esp32

main:
  sleep-pin := gpio.Pin --input 33 --pull-up
  if sleep-pin.get != 0:
    // Not pulled low. Go to sleep.
    esp32.deep-sleep (Duration --s=2)
