import certificate_roots
import mqtt
import net

ADAFRUIT_IO_USERNAME ::= "<YOUR_USERNAME>"
ADAFRUIT_IO_KEY ::= "<YOUR_KEY>"

ADAFRUIT_IO_FEEDNAME ::= "temperature"

ADAFRUIT_IO_HOST ::= "io.adafruit.com"

CLIENT_ID ::= ""

main:
  network := net.open
  transport := mqtt.TcpTransport.tls network --host=ADAFRUIT_IO_HOST
      --root_certificates=[certificate_roots.DIGICERT_GLOBAL_ROOT_CA]
  /**
  // Alternatively, you can also connect without TLS, by using the
  // following transport:
  transport := mqtt.TcpTransport network --host=HOST
  // In that case you can remove the `certificate_roots` import.
  */

  client := mqtt.Client --transport=transport

  options := mqtt.SessionOptions
    --client_id = CLIENT_ID
    --username = ADAFRUIT_IO_USERNAME
    --password = ADAFRUIT_IO_KEY

  client.start --options=options

  print "Connected to broker"

  topic := "$ADAFRUIT_IO_USERNAME/feeds/$ADAFRUIT_IO_FEEDNAME"

  // Simulates a temperature sensor.
  temperature := 25.0
  10.repeat:
    temperature += ((random 100) - 50) / 100.0
    client.publish topic "$temperature".to_byte_array
    // Don't publish too often to avoid rate limiting.
    sleep --ms=2_500

  client.close
  network.close
