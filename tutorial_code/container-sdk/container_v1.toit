// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.containers

main:
  images := containers.images
  images.do: | image/containers.ContainerImage |
    print "$image.id - $image.name"
