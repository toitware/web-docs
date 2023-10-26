// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import dhtxx
import gpio

GPIO-PIN-NUM ::=  32

main:
  pin := gpio.Pin GPIO-PIN-NUM
  driver := dhtxx.Dht11 pin

  (Duration --ms=500).periodic:
    print driver.read
