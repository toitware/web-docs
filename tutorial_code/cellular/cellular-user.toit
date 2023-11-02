import net
import net.cellular

main:
  network := cellular.open --name="walter" {:}

  try:
    do-network-things network
  finally:
    network.close


do-network-things network/net.Client:
  // Use the network.
