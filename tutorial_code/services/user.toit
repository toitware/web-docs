// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import .client

main:
  name := "client - $Time.now"
  print "My name is $name"
  main --name=name

main --name:
  client := NotificationServiceClient
  client.open
  connection := client.connect
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
      client.close
