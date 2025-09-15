#!/usr/bin/env python3
"""
Custom HTTP server with 404.html support for local development
"""
import http.server
import socketserver
import os
import urllib.parse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None):
        if code == 404:
            # Check if 404.html exists
            if os.path.exists('404.html'):
                self.send_response(200)  # Send 200 instead of 404
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                with open('404.html', 'rb') as f:
                    self.wfile.write(f.read())
                return
        # For other errors, use default behavior
        super().send_error(code, message)

if __name__ == "__main__":
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("Custom 404.html support enabled!")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
