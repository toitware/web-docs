import certificate_roots
import http
import net

URL ::= "<YOUR URL>"
CERTIFICATE ::= certificate_roots.GTS_ROOT_R1

main:
  network := net.open
  client := http.Client.tls network
      --root_certificates=[CERTIFICATE]

  request := client.post_json --uri=URL {
    "timestamp": Time.now.utc.to_iso8601_string,
    "temperature": 42.0,
    "humidity": 1013.25,
  }

  if request.status_code != 200:
    print "Request failed: $request.status_code $request.status_message"
  else:
    request.drain
