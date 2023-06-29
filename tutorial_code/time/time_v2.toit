// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the EXAMPLES_LICENSE file.

main:
  set_timezone "CET-1CEST,M3.5.0,M10.5.0/3"  // Central European Timezone (as of 2022).
  print Time.now.local
