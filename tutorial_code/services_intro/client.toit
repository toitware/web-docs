// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.services show ServiceClient ServiceSelector
import .service

class RandomGeneratorServiceClient extends ServiceClient
    implements RandomGeneratorService:

  static SELECTOR ::= RandomGeneratorService.SELECTOR

  constructor selector=SELECTOR:
    assert: selector.matches SELECTOR
    super selector

  generate limit/int -> int:
    return invoke_ RandomGeneratorService.GENERATE_INDEX limit
