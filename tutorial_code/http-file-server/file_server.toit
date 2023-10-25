import host.file
import host.directory
import http
import net

CSS ::= """
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}

.container {
    width: 80%;
    margin: auto;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
}

.directory, .file {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 5px 0;
    cursor: pointer;
    transition: 0.3s;
}

.directory:hover, .file:hover {
    background-color: #e0e0e0;
}

.directory:before {
    content: "📁 ";
}

.file:before {
    content: "📄 ";
}

a {
    color: inherit;
    text-decoration: none;
}
"""

main:
  network := net.open
  server-socket := network.tcp-listen 0
  port := server-socket.local-address.port
  print "Listening on http://localhost:$port/"

  clients := []
  server := http.Server
  task::
    server.listen server-socket:: | request/http.RequestIncoming response-writer/http.ResponseWriter |
      // Note that we are not sanitizing the path here.  This is a security
      // risk, as it allows a client to access files outside of the current
      // directory.
      path := "./$request.path"
      if file.is-file path:
        serve-file request.path response-writer
      else if file.is-directory path:
        serve-directory request.path response-writer
      else:
        response-writer.write-headers http.STATUS-NOT-FOUND --message="Not Found"
      response-writer.close

serve-file request-path/string writer/http.ResponseWriter:
  path := "./$request-path"
  // Serve the file as binary data.
  writer.headers.add "Content-Type" "application/octet-stream"
  writer.headers.add "Content-Length" "$(file.size path)"
  stream := file.Stream.for-read path
  try:
    while chunk := stream.read:
      writer.write chunk
  finally:
    stream.close

serve-directory request-path/string writer/http.ResponseWriter:
  // List the directory contents.
  path := "./$request-path"
  stream := directory.DirectoryStream path
  writer.headers.add "Content-Type" "text/html"
  writer.write """
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Directory Listing - $request-path</title>
      <style>
        $CSS
      </style>
    </head>
    <body>
      <h1>Directory Listing - $request-path</h1>
    """
  while entry := stream.next:
    entry-path := "$path/$entry"
    prefix := request-path.trim --right "/"
    entry-request-path := "$prefix/$entry"
    if file.is-directory entry-path:
      writer.write """
        <div class="directory">
          <a href="$entry-request-path">$entry/</a>
        </div>
      """
    else:
      writer.write """
        <div class="file">
          <a href="$entry-request-path" download>$entry</a>
        </div>
      """
  stream.close
  writer.write """
    </body>
    </html>
  """
