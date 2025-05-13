import { useEffect, useContext, useCallback } from "react";
import useSocket from "./useSocket";
import { ChatContext } from "../context/chatContext";
import { setItem } from "../utils/localStorage";
import { UserContext } from "../context/userContext";

const useMessageHandler = () => {
  const { user } = useContext(UserContext);
  const { socket } = useSocket();
  const { setChatRooms } = useContext(ChatContext);

  const updateChatRoomsWithMessage = (roomID, newMessage) => {
    setChatRooms((prevRooms) => {
      const updatedRooms = {
        ...prevRooms,
        [roomID]: {
          ...prevRooms[roomID],
          messages: [...prevRooms[roomID].messages, newMessage],
        },
      };
      setItem("chatRooms", updatedRooms);
      return updatedRooms;
    });
  };

  const sendMessage = useCallback(
    (event, currentChatRoom) => {
      event.preventDefault();
      const messageContent = event.target.chatInput.value.trim();
      if (!socket || messageContent === "") return;

      const newMessage = {
        roomID: currentChatRoom.roomID,
        message: messageContent,
        username: user.username,
        avatar: user.avatar,
        self: true,
      };

      socket.emit("send_message", newMessage);
      updateChatRoomsWithMessage(currentChatRoom.roomID, newMessage);

      event.target.chatInput.value = "";
    },
    [socket, user.username, updateChatRoomsWithMessage]
  );

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      const newMessage = {
        message: data.message,
        avatar: user.avatar,
        username: data.username,
        self: false,
      };
      updateChatRoomsWithMessage(data.roomID, newMessage);
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, updateChatRoomsWithMessage]);

  return { sendMessage };
};

export default useMessageHandler;
