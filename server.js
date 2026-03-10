const WebSocket = require('ws');
const http = require('http');

// Render REQUIRES you to use process.env.PORT
const port = process.env.PORT || 8080;

// Create a basic server so Render's health check passes
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Server is Live');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    
    // Send to all connected clients (ESP32 and Mobile)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
