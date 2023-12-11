// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.services show ServiceSelector

interface RandomGeneratorService:
  static SELECTOR ::= ServiceSelector
      --uuid="8195471c-6b9c-4975-8665-ecf3d1af5be1"
      --major=0
      --minor=1

  generate limit/int -> int
  static GENERATE_INDEX ::= 1
