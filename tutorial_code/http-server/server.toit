import http
import net
import .index

main:
  network := net.open
  server_socket := network.tcp_listen 0
  port := server_socket.local_address.port
  print "Listening on http://$network.address:$port/"

  clients := []
  server := http.Server --max_tasks=5
  server.listen server_socket:: | request/http.RequestIncoming response_writer/http.ResponseWriter |
    if request.path == "/" or request.path == "/index.html":
      response_writer.headers.add "Content-Type" "text/html"
      response_writer.write INDEX_HTML
    else if request.path == "/ws":
      web_socket := server.web_socket request response_writer
      clients.add web_socket
      while data := web_socket.receive:
        clients.do: it.send data
      clients.remove web_socket
    else:
      response_writer.write_headers http.STATUS_NOT_FOUND --message="Not Found"
