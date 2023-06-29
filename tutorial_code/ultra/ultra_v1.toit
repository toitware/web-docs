// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import gpio

TRIGGER ::= 33
ECHO ::= 32

measure_distance trigger echo:
  trigger_start := Time.monotonic_us
  trigger.set 1
  while Time.monotonic_us < trigger_start + 10:
    // Do nothing while waiting for the 10us.
  trigger.set 0

  while echo.get != 1: null
  echo_start := Time.monotonic_us
  while echo.get == 1: null
  echo_end := Time.monotonic_us
  diff := echo_end - echo_start
  return diff / 58

main:
  trigger := gpio.Pin TRIGGER --output
  echo := gpio.Pin ECHO --input
  while true:
    print "measured $(measure_distance trigger echo)cm"
    sleep --ms=500
