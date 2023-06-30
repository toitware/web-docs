// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

main:
  pin := gpio.Pin 32 --output
  pin.set 1
  sleep --ms=1000
  pin.set 0
  pin.close
