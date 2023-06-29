// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import ds18b20
import one_wire
import gpio

GPIO_PIN_NUM ::=  32

main:
  pin := gpio.Pin GPIO_PIN_NUM
  ow := one_wire.Protocol pin
  driver := ds18b20.Driver ow

  (Duration --ms=500).periodic:
    print "Temperature: $(%.2f driver.read_temperature) C"
