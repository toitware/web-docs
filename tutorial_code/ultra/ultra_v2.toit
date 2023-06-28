// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

import gpio
import hc_sr04

TRIGGER ::= 33
ECHO ::= 32

main:
  trigger := gpio.Pin TRIGGER
  echo := gpio.Pin ECHO
  sensor := hc_sr04.Driver --echo=echo --trigger=trigger

  while true:
    distance := sensor.read_distance
    print "measured $distance mm"
    sleep --ms=500
