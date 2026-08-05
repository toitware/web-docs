// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import dhtxx

GPIO-PIN-NUM ::=  32

main:
  driver := dhtxx.Dht11 GPIO-PIN-NUM

  (Duration --ms=1000).periodic:
    print driver.read
