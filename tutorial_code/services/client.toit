// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import monitor
import system.services show ServiceClient ServiceResourceProxy
import .service

class NotificationServiceClient extends ServiceClient:
  static SELECTOR ::= NotificationService.SELECTOR

  constructor selector=SELECTOR:
    assert: selector.matches SELECTOR
    super selector

  connect -> Connection:
    handle := invoke_ NotificationService.CONNECT-INDEX null
    proxy := Connection this handle
    return proxy

  send_ handle/int message/string -> none:
    invoke_ NotificationService.CONNECTION-SEND-INDEX [handle, message]

class Connection extends ServiceResourceProxy:
  channel_ := monitor.Channel 10

  constructor client/ServiceClient handle/int:
    super client handle

  send message/string -> none:
    client := (client_ as NotificationServiceClient)
    client.send_ handle_ message

  receive -> string:
    return channel_.receive

  on-notified_ notification/any -> none:
    channel_.send notification
