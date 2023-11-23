// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import watchdog show WatchdogServiceClient

main:
  // Create a watchdog client that connects to the provider.
  client := WatchdogServiceClient
  // Connect to the provider that has been started earlier.
  client.open

  // Create a watchdog.
  dog := client.create "docs.toit.io/tutorial/my-dog"

  // Require a feeding every 60 seconds.
  dog.start --s=60

  // Feed it:
  dog.feed

  // Stop it, if not necessary:
  dog.stop

  // When stopped, close it.
  dog.close

  print "done"
