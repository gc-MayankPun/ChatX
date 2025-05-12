const socketHandler = (io) => {
  io.on("connection", (socket) =>
    console.log(`Server connected with id: ${socket.id}`)
  );
};

module.exports = socketHandler