import http
import net
import certificate_roots
import encoding.json

URL ::= "uselessfacts.jsph.pl"
PATH ::= "/random.json?language=en"
CERTIFICATE ::= certificate_roots.ISRG_ROOT_X1

main:
  network := net.open
  client := http.Client.tls network
      --root_certificates=[CERTIFICATE]

  request := client.get URL PATH
  decoded := json.decode_stream request.body
  print decoded["text"]
