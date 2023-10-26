import certificate-roots
import mqtt
import net

ADAFRUIT-IO-USERNAME ::= "<YOUR_USERNAME>"
ADAFRUIT-IO-KEY ::= "<YOUR_KEY>"

ADAFRUIT-IO-FEEDNAME ::= "temperature"

ADAFRUIT-IO-HOST ::= "io.adafruit.com"

CLIENT-ID ::= ""

main:
  network := net.open
  transport := mqtt.TcpTransport.tls network --host=ADAFRUIT-IO-HOST
      --root-certificates=[certificate-roots.DIGICERT-GLOBAL-ROOT-CA]
  /**
  // Alternatively, you can also connect without TLS, by using the
  // following transport:
  transport := mqtt.TcpTransport network --host=HOST
  // In that case you can remove the `certificate_roots` import.
  */

  client := mqtt.Client --transport=transport

  options := mqtt.SessionOptions
    --client-id = CLIENT-ID
    --username = ADAFRUIT-IO-USERNAME
    --password = ADAFRUIT-IO-KEY

  client.start --options=options

  print "Connected to broker"

  topic := "$ADAFRUIT-IO-USERNAME/feeds/$ADAFRUIT-IO-FEEDNAME"

  // Simulates a temperature sensor.
  temperature := 25.0
  10.repeat:
    temperature += ((random 100) - 50) / 100.0
    client.publish topic "$temperature".to-byte-array
    // Don't publish too often to avoid rate limiting.
    sleep --ms=2_500

  client.close
  network.close
