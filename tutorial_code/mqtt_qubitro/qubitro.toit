// Copyright (C) 2024 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import qubitro
import qubitro.service

main:
  // Start the Qubitro service.
  service.main

  // Connect to the service and publish through it.
  client ::= qubitro.connect
  client.publish { "MyData": random 1000 }
