// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import monitor

/**
A notification service that connects multiple clients to each other.
*/
interface NotificationService:
  connect -> Connection

/**
A connection to a notification service.

All messages sent through the connection are broadcast to all other
  connections.
*/
interface Connection:
  /** Closes the connection. */
  close -> none
  /** Sends a message to all other connected clients. */
  send message/string -> none
  /**
  Receives a message from another client.
  This method blocks until a message is received.
  */
  receive -> string

class NotificationService_ implements NotificationService:
  clients_ := {:}
  client-id_ := 0

  connect -> Connection:
    id := client-id_++
    result := Connection_ id this
    clients_[id] = result
    return result

  send-all_ message/string --sender/int -> none:
    clients_.do: | client-id connection/Connection_ |
      if client-id != sender:
        connection.dispatch_ message

class Connection_ implements Connection:
  id/int
  service_/NotificationService_
  channel/monitor.Channel ::= monitor.Channel 10

  constructor .id .service_:

  close -> none:
    service_.clients_.remove id

  send message/string -> none:
    service_.send-all_ message --sender=id

  receive -> string:
    return channel.receive

  dispatch_ message/string -> none:
    channel.send message

run service/NotificationService --name/string:
  connection/Connection? := service.connect
  send-task/Task? := null
  try:
    send-task = task::
      counter := 0
      while true:
        connection.send "hello from $name ($(counter++))"
        sleep (Duration --s=(1 + (random 3)))

    while true:
      message := connection.receive
      if message == "quit":
        break
      print "$name received: $message"

  finally:
    // Make sure we execute all of these finally statements
    // even if one of them yields.
    critical-do:
      if send-task != null:
        send-task.cancel
      connection.close

main:
  service := NotificationService_
  runner1 := task:: run service --name="runner1"
  runner2 := task:: run service --name="runner2"
  runner3 := task:: run service --name="runner3"

  sleep (Duration --s=10)
  main-connection := service.connect
  main-connection.send "quit"
  main-connection.close
