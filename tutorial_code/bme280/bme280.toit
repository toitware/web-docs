// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio
import i2c
import bme280

main:
  bus := i2c.Bus
    --sda=gpio.Pin 25
    --scl=gpio.Pin 26

  // Use 'I2C_ADDRESS' if your device has address 0x76 (118).
  // Use 'I2C_ADDRESS_ALT' if your device has address 0x77 (119).
  device := bus.device bme280.I2C_ADDRESS

  driver := bme280.Driver device

  print "$driver.read_temperature C"
  print "$driver.read_pressure Pa"
  print "$driver.read_humidity %"

  driver.close
  bus.close
