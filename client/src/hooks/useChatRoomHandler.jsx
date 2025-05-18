import { useCallback } from "react";
import { useSocket } from "../context/socketContext";

const useChatRoomHandler = () => {
  const { socket } = useSocket();

  const emitCreateRoom = useCallback(
    (roomID, roomName) => {
      if (!socket) return;
      socket.emit("createRoom", { roomID, roomName });
    },
    [socket]
  );

  const emitJoinRoom = useCallback(
    (roomID) => {
      if (!socket) return;
      socket.emit("joinRoom", roomID);
    },
    [socket]
  );

  const emitLeaveRoom = useCallback(
    (roomID) => {
      if (!socket) return;
      socket.emit("leaveRoom", roomID);
    },
    [socket]
  );

  return { emitCreateRoom, emitJoinRoom, emitLeaveRoom };
};

export default useChatRoomHandler;
