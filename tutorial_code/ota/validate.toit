// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.firmware

main:
  print "hello after update"

  if firmware.is_validation_pending:
    if firmware.validate:
      print "firmware update validated"
    else:
      print "firmware update failed to validate"
