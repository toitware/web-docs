// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import i2c

main:
  scl := gpio.Pin 25
  sda := gpio.Pin 26
  frequency := 100_000

  bus := i2c.Bus --sda=sda --scl=scl --frequency=frequency

  devices := bus.scan
  devices.do: print it
