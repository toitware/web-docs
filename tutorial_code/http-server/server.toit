import http
import net
import .index

main:
  network := net.open
  server-socket := network.tcp-listen 0
  port := server-socket.local-address.port
  print "Listening on http://$network.address:$port/"

  clients := []
  server := http.Server --max-tasks=5
  server.listen server-socket:: | request/http.RequestIncoming response-writer/http.ResponseWriter |
    if request.path == "/" or request.path == "/index.html":
      response-writer.headers.add "Content-Type" "text/html"
      response-writer.write INDEX-HTML
    else if request.path == "/ws":
      web-socket := server.web-socket request response-writer
      clients.add web-socket
      while data := web-socket.receive:
        clients.do: it.send data
      clients.remove web-socket
    else:
      response-writer.write-headers http.STATUS-NOT-FOUND --message="Not Found"
