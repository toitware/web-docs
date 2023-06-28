// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio

main:
  button := gpio.Pin 27 --input --pull_down
  led := gpio.Pin 26 --output

  while true:
    if button.get == 1:
      led.set 1
    else:
      led.set 0
