// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

main:
  now := Time.now
  utc := now.utc
  print "UTC: $utc"
  print utc.to-iso8601-string
  local := now.local
  print "Local: $local"
  print "local time: $(%02d local.h):$(%02d local.m):$(%02d local.s)"
