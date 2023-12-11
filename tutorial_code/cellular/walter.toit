import cellular.modules.sequans.monarch
import http
import encoding.json
import net
import net.cellular
import certificate-roots

RX ::= 14
TX ::= 48
RTS ::= 21
CTS ::= 47
RESET ::= 45
POWER ::= 46
BAUD ::= 115200

main:
  // Start the monarch driver/provider.
  task --background::
    monarch.main

  // Establish the connection to the network.
  network := cellular.open --name="gm02sp" {
    cellular.CONFIG-UART-RX: RX,
    cellular.CONFIG-UART-TX: TX,
    cellular.CONFIG-UART-CTS: CTS,
    cellular.CONFIG-UART-RTS: RTS,
    cellular.CONFIG-RESET: [RESET, cellular.CONFIG-ACTIVE-LOW],
    cellular.CONFIG-POWER: POWER,
    cellular.CONFIG-UART-BAUD-RATE: BAUD,
    // If your provider requires an APN, you can set it here.
    // cellular.CONFIG-APN: "<your-apn>",
  }

  try:
    do-network-things network
  finally:
    network.close

do-network-things network/net.Client:
  certificate-roots.GTS-ROOT-R1.install
  client := http.Client.tls network
  request := client.get --uri="https://official-joke-api.appspot.com/random_joke"
  decoded := json.decode-stream request.body
  print decoded["setup"]
  print decoded["punchline"]
