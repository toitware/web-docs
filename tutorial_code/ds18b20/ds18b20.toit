// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import ds18b20 show Ds18b20
import gpio

GPIO-PIN-NUM ::= 32

main:
  pin := gpio.Pin GPIO-PIN-NUM
  ds18b20 := Ds18b20 pin

  (Duration --ms=500).periodic:
    print "Temperature: $(%.2f ds18b20.read-temperature) C"
