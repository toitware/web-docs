// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

main:
  pin := gpio.Pin 32 --output
  while true:
    pin.set 0
    sleep --ms=500
    pin.set 1
    sleep --ms=500
