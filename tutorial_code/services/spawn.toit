// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import .user as user
import .provider
import .client

main:
  spawn::
    provider := NotificationServiceProvider
    provider.install
    sleep (Duration --s=15)
    provider.uninstall

  spawn:: user.main --name="process1"
  spawn:: user.main --name="process2"
  spawn:: user.main --name="process3"

  sleep (Duration --s=10)
  client := NotificationServiceClient
  client.open
  connection := client.connect
  connection.send "quit"
  connection.close
  client.close
