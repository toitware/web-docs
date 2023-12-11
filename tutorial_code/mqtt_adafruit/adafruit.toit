import certificate-roots
import mqtt

ADAFRUIT-IO-USERNAME ::= "<YOUR_USERNAME>"
ADAFRUIT-IO-KEY ::= "<YOUR_KEY>"

ADAFRUIT-IO-FEEDNAME ::= "temperature"

ADAFRUIT-IO-HOST ::= "io.adafruit.com"

CLIENT-ID ::= ""

main:
  certificate-roots.install-common-trusted-roots

  client := mqtt.Client.tls --host=ADAFRUIT-IO-HOST
  /**
  // Alternatively, you can also connect without TLS, by using the
  // following client constructor:
  client := mqtt.Client --host=ADAFRUIT-IO-HOST
  // In that case you can remove the `certificate-roots` import and
  // avoid calling `certificate-roots.install-common-trusted-roots`.
  */

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
