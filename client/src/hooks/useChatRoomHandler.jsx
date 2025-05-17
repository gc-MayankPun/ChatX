import React, { useEffect } from "react";
import { useSocket } from "../context/socketContext";
import { getItem } from "../utils/localStorage";
// import useSocket from "./useSocket";

const useChatRoomHandler = () => {
  const { socket } = useSocket();
  const chatRooms = getItem("chatRooms")

  // useEffect(() => {
  //   if (!socket) return;

  //   joinRoom("🌍 General");
  // }, [socket]);

  useEffect(() => {
    if (chatRooms) {
      Object.keys(chatRooms).map((roomID) => {
        joinRoom(roomID);
      });
    }
  }, [chatRooms]);

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
