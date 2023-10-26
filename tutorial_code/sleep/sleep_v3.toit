// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.


import esp32

main:
  // Enable wakeup if pin 32 goes high.
  pin-mask := 1 << 32
  on-any-high := true
  esp32.enable-external-wakeup pin-mask on-any-high
  esp32.deep-sleep (Duration --m=3)
