// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import pictogrammers-icons.size-48 as icons
import gpio
import i2c
import pixel-display show *
import pixel-display.two-color show *
import ssd1306 show *

get-display -> TwoColorPixelDisplay:
  sda := gpio.Pin 26
  scl := gpio.Pin 25
  frequency := 400_000

  bus := i2c.Bus --sda=sda --scl=scl --frequency=frequency

  devices := bus.scan
  if not devices.contains Ssd1306.I2C-ADDRESS:
    throw "No SSD1306 display found"

  device := bus.device Ssd1306.I2C-ADDRESS
  driver := Ssd1306.i2c device
  return TwoColorPixelDisplay driver

main:
  display := get-display
  display.background = BLACK

  context := display.context --landscape --color=WHITE
  icon := display.icon context 0 50 icons.HUMAN-SCOOTER
  while true:
    80.repeat:
      icon.move-to it 50
      display.draw
      sleep --ms=1
    sleep --ms=2_000
