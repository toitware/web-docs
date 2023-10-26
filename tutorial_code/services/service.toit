// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.services show ServiceSelector

/**
A notification service that connects multiple clients to each other.
*/
interface NotificationService:
  static SELECTOR ::= ServiceSelector
      --uuid="c6f4862f-c17f-4624-865b-fa19467865c5"
      --major=0
      --minor=1

  /**
  Connects this client to the notification service.

  Returns a handle (int) to the Connection.
  */
  connect -> int
  static CONNECT-INDEX ::= 0

  connection-send handle/int message/string -> none
  static CONNECTION-SEND-INDEX ::= 1
