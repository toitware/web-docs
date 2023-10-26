// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio
import i2c
import bme280

main:
  bus := i2c.Bus
    --sda=gpio.Pin 26
    --scl=gpio.Pin 25

  // Use 'I2C_ADDRESS' if your device has address 0x76 (118).
  // Use 'I2C_ADDRESS_ALT' if your device has address 0x77 (119).
  device := bus.device bme280.I2C-ADDRESS-ALT

  driver := bme280.Driver device

  print "$driver.read-temperature C"
  print "$driver.read-pressure Pa"
  print "$driver.read-humidity %"

  driver.close
  bus.close
