// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import telegram show *

TELEGRAM-TOKEN ::= "<YOUR TOKEN>"

main:
  client := Client --token=TELEGRAM-TOKEN
  my-username := client.get-me.username

  client.listen: | update/Update? |
    if update is UpdateMessage:
      print "Got message: $update"
      message := (update as UpdateMessage).message
      if message.chat and message.chat.type == Chat.TYPE-PRIVATE:
        client.send-message "Of course!"
            --chat-id=message.chat.id
