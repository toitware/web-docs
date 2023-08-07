// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.services show ServiceProvider ServiceResource ServiceHandler
import .service

class NotificationServiceProvider extends ServiceProvider
    implements ServiceHandler:
  connections_ ::= {:}

  constructor:
    super "tutorial/notification" --major=1 --minor=0
    provides NotificationService.SELECTOR --handler=this

  handle index/int arguments/any --gid/int --client/int -> any:
    if index == NotificationService.CONNECT_INDEX:
      connection := Connection this client
      connections_[connection.id] = connection
      return connection
    if index == NotificationService.CONNECTION_SEND_INDEX:
      sender := (this.resource client arguments[0]) as Connection
      message := arguments[1]
      connections_.do: | id connection/Connection |
        if id != sender.id:
          connection.dispatch_ message
      return null
    unreachable

  remove_connection_ connection/Connection:
    connections_.remove connection.id

class Connection extends ServiceResource:
  static id_counter/int := 0

  provider/NotificationServiceProvider
  id/int

  constructor .provider client/int:
    id = id_counter++
    super provider client --notifiable

  dispatch_ message/string -> none:
    notify_ message

  on_closed -> none:
    provider.remove_connection_ this

main:
  provider := NotificationServiceProvider
  provider.install
