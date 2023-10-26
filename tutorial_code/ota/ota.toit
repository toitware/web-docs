// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import http
import net
import system.firmware
import reader show Reader SizedReader

UPDATE-URL := "http://<YOUR_IP>:8000/ota.bin"

install-firmware reader/SizedReader -> none:
  firmware-size := reader.size
  print "installing firmware with $firmware-size bytes"
  written-size := 0
  writer := firmware.FirmwareWriter 0 firmware-size
  try:
    last := null
    while data := reader.read:
      written-size += data.size
      writer.write data
      percent := (written-size * 100) / firmware-size
      if percent != last:
        print "installing firmware with $firmware-size bytes ($percent%)"
        last = percent
    writer.commit
    print "installed firmware; ready to update on chip reset"
  finally:
    writer.close

main:
  network := net.open
  client := http.Client network
  try:
    response := client.get --uri=UPDATE-URL
    install-firmware (response.body as SizedReader)
  finally:
    client.close
    network.close
  firmware.upgrade
