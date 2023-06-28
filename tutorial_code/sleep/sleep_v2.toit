// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio
import esp32

main:
  sleep_pin := gpio.Pin --input 33 --pull_up
  if sleep_pin.get != 0:
    // Not pulled low. Go to sleep.
    esp32.deep_sleep (Duration --s=2)
