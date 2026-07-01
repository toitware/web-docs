// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import hc-sr04

TRIGGER ::= 33
ECHO ::= 32

main:
  sensor := hc-sr04.Driver --echo=ECHO --trigger=TRIGGER

  while true:
    distance := sensor.read-distance
    print "measured $distance mm"
    sleep --ms=500
