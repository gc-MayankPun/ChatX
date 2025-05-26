const socketHandler = (io) => {
  io.use(require("../middlewares/socketAuth"));

  io.on("connection", (socket) => {
    // console.log(`Server connected with id: ${socket.id}`);
    // console.log("Socket user:", socket.user.username);

    // Create Rooms
    socket.on("createRoom", ({ roomID, roomName }) => {
      socket.join(roomID);
      // console.log(
      //   `User ${socket.user.username} created room with name ${roomName} and it's id: ${roomID}`
      // );
    });

    // Join Room
    socket.on("joinRoom", (roomID) => {
      socket.join(roomID);
      // console.log(
      //   `User ${socket.user.username} joined a room with id: ${roomID}`
      // );
      if (roomID !== "🌍 General") {
        socket.to(roomID).emit("user-join", {
          roomID,
          username: socket.user.username,
          action: "join",
        });
      }
    });

    // Leave Room
    socket.on("leaveRoom", (roomID) => {
      socket.leave(roomID);
      // console.log(`User ${socket.user.username} left ${roomID} room`);
      if (roomID !== "🌍 General") {
        socket.to(roomID).emit("user-left", {
          roomID,
          username: socket.user.username,
          action: "leave",
        });
      }
    });

    // Room Chat
    socket.on("send_message", (data) => {
      // console.log(
      //   `Data received: ${data.message} by ${data.username} on ${data.roomID}`
      // );
      socket.to(data.roomID).emit("receive_message", data);
    });
  });
};

module.exports = socketHandler;
