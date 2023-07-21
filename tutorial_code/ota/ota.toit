// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import http
import net
import system.firmware
import reader show Reader SizedReader

UPDATE_URL := "http://<YOUR_IP>:8000/ota.bin"

install_firmware reader/SizedReader -> none:
  firmware_size := reader.size
  print "installing firmware with $firmware_size bytes"
  written_size := 0
  writer := firmware.FirmwareWriter 0 firmware_size
  try:
    last := null
    while data := reader.read:
      written_size += data.size
      writer.write data
      percent := (written_size * 100) / firmware_size
      if percent != last:
        print "installing firmware with $firmware_size bytes ($percent%)"
        last = percent
    writer.commit
    print "installed firmware; ready to update on chip reset"
  finally:
    writer.close

main:
  network := net.open
  client := http.Client network
  try:
    response := client.get --uri=UPDATE_URL
    install_firmware (response.body as SizedReader)
  finally:
    client.close
    network.close
  firmware.upgrade
