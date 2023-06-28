// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio
import gpio.touch as gpio

main:
  pin := gpio.Pin 32
  touch := gpio.Touch pin

  while true:
    print (touch.read --raw)
    sleep --ms=500
