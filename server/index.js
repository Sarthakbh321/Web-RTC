const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Server is up and running");
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));