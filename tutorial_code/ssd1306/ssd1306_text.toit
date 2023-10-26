// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import font show *
import gpio
import i2c
import pixel-display show *
import pixel-display.two-color show *
import ssd1306 show *

current-date:
  now := Time.now.local
  return "$now.year-$(%02d now.month)-$(%02d now.day)"

current-time:
  now := Time.now.local
  return "$(%02d now.h):$(%02d now.m):$(%02d now.s)"

main:
  sda := gpio.Pin 26
  scl := gpio.Pin 25
  frequency := 400_000

  bus := i2c.Bus --sda=sda --scl=scl --frequency=frequency

  devices := bus.scan
  if not devices.contains Ssd1306.I2C-ADDRESS:
    throw "No SSD1306 display found"

  device := bus.device Ssd1306.I2C-ADDRESS
  driver := Ssd1306.i2c device
  display := TwoColorPixelDisplay driver
  display.background = BLACK

  sans := Font.get "sans10"
  sans-context := display.context
      --landscape
      --font=sans
      --color=WHITE
  display.text sans-context 30 20 "Toit"
  date := display.text sans-context 30 40 ""
  time-text := display.text sans-context 30 60 ""
  while true:
    date.text = current-date
    time-text.text = current-time
    display.draw
    sleep --ms=250
