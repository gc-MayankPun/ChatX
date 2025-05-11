const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      console.log("Received:", data.message);
      socket.broadcast.emit("receive_message", data); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
