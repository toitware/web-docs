// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import ds18b20 show Ds18b20
import gpio

GPIO_PIN_NUM ::= 32

main:
  pin := gpio.Pin GPIO_PIN_NUM
  ds18b20 := Ds18b20 pin

  (Duration --ms=500).periodic:
    print "Temperature: $(%.2f ds18b20.read_temperature) C"
