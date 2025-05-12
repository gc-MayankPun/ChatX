const connectDB = require("./config/dbConfig");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const socketHandler = require("./utils/socketHandler");
require("dotenv").config();

const PORT = process.env.PORT;

const server = http.createServer(app); // Create an HTTP server using the Express app
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); // Attach Socket.IO to the HTTP server

connectDB(); // Connect the DB

app.set("io", io); //  Make the io instance accessible throughout the app

socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server listening at Port: ${PORT}`);
}); // Start the HTTP server (with Express + WebSocket support) on the specified port
