// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

main:
  led := gpio.Pin 32 --output
  led.set 1
  sleep --ms=10_000
  led.close
