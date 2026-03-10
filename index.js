const WebSocket = require("ws");
const http = require("http");
const PORT = process.env.PORT || 8080;
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("WebSocket Server is Running");
});
const wss = new WebSocket.Server({ server });
wss.on("connection", socket => {
    console.log("Client Connected");
    socket.on("message", message => {
        console.log("Received:", message.toString());
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    
    socket.on("close", () => console.log("Client Disconnected"));
});
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});