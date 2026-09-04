// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import i2c
import bmx280

main:
  bus := i2c.Bus
      --sda=26
      --scl=25

  // Use 'I2C-ADDRESS' if your device has address 0x76 (118).
  // Use 'I2C-ADDRESS-ALT' if your device has address 0x77 (119).
  device := bus.device bmx280.I2C-ADDRESS-ALT

  driver := bmx280.Driver device

  print "$driver.read-temperature C"
  print "$driver.read-pressure Pa"
  print "$driver.read-humidity %"

  driver.close
  bus.close
