// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.


import esp32

main:
  // Enable wakeup if pin 32 goes high.
  pin_mask := 1 << 32
  on_any_high := true
  esp32.enable_external_wakeup pin_mask on_any_high
  esp32.deep_sleep (Duration --m=3)
