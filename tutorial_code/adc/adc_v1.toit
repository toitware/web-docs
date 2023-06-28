// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio
import gpio.adc

main:
  pin := gpio.Pin 34
  adc := adc.Adc pin
  256.repeat:
    print adc.get
    sleep --ms=500
