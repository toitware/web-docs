// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

import system.containers

main:
  images := containers.images
  current_id := containers.current
  images.do: | image/containers.ContainerImage |
    print "$image.id - $image.name"
    if image.name != "jaguar" and image.id != current_id:
      print "Starting"
      container := containers.start image.id
      status := container.wait
      print "Container exited with status $status"
