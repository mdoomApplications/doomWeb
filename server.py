
import socketserver


import socket

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


import http.server
import socketserver

PORT = 59717  # Use the port provided in the environment

Handler = http.server.SimpleHTTPRequestHandler


class CORSRequestHandler(Handler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

with ReusableTCPServer(("0.0.0.0", PORT), CORSRequestHandler) as httpd:

    print("serving at port", PORT)
    
    print("Server is ready to receive requests...")
    httpd.serve_forever()
