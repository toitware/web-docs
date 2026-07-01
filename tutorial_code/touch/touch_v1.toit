// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio.touch as gpio

main:
  touch := gpio.Touch 32

  while true:
    print (touch.read --raw)
    sleep --ms=500
