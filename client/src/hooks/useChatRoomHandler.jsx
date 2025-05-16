import React, { useEffect } from "react";
import useSocket from "./useSocket";

const useChatRoomHandler = () => {
  const { socket } = useSocket();

  // useEffect(() => {
  //   if (!socket) return;

  //   joinRoom("🌍 General");
  // }, [socket]);

  const createRoom = (roomID, roomName) => {
    if (!socket) return;

    socket.emit("createRoom", { roomID, roomName });
  };

  const joinRoom = (roomID) => {
    if (!socket) return;

    socket.emit("joinRoom", roomID);
  };

  return { createRoom, joinRoom };
};

export default useChatRoomHandler;
