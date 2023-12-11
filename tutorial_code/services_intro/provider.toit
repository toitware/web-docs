// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.services show ServiceProvider ServiceHandler
import .service

class RandomGeneratorServiceProvider extends ServiceProvider
    implements ServiceHandler RandomGeneratorService:

  constructor:
    super "test/random-generator" --major=7 --minor=9
    provides RandomGeneratorService.SELECTOR --handler=this

  handle index/int arguments/any --gid/int --client/int -> any:
    if index == RandomGeneratorService.GENERATE_INDEX:
      return generate arguments
    unreachable

  generate limit/int -> int:
    print "got request to generate a random number with limit $limit"
    return random limit
