import { useEffect, useContext, useCallback } from "react";
import useSocket from "./useSocket";
import { ChatContext } from "../context/chatContext";
import { UserContext } from "../context/userContext";
import axios from "axios";

const useMessageHandler = () => {
  const { user } = useContext(UserContext);
  const { socket } = useSocket();
  const { setChatRooms } = useContext(ChatContext);

  const updateChatRoomsWithMessage = useCallback(
    (roomID, newMessage) => {
      setChatRooms((prevRooms) => {
        const updatedRooms = {
          ...prevRooms,
          [roomID]: {
            ...prevRooms[roomID],
            messages: [...prevRooms[roomID].messages, newMessage],
          },
        };
        // setItem("chatRooms", updatedRooms);
        return updatedRooms;
      });
    },
    [setChatRooms]
  );

  const sendGeneralMessage = async (messageContent) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/send`,
      { message: messageContent },
      {
        withCredentials: true,
      }
    );

    // Handle if a message is failed to send then show it to the user
  };

  const sendMessage = useCallback(
    (event, currentChatRoom) => {
      event.preventDefault();
      const messageContent = event.target.chatInput.value.trim();
      if (!socket || messageContent === "") return;

      if (currentChatRoom.roomID === "🌍 General") {
        sendGeneralMessage(messageContent);
        event.target.chatInput.value = "";
        return;
      }

      const timestamp = new Date().toISOString();
      const newMessage = {
        roomID: currentChatRoom.roomID,
        message: messageContent,
        username: user.username,
        avatar: user.avatar,
        self: true,
        time: timestamp,
      };

      updateChatRoomsWithMessage(currentChatRoom.roomID, newMessage);

      event.target.chatInput.value = "";
    },
    [socket, user.username, updateChatRoomsWithMessage]
  );

  const fetchGeneralMessages = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/receiveAll`,
      { withCredentials: true }
    );

    const messages = response.data.messages.map((msg) => ({
      roomID: "🌍 General",
      message: msg.message,
      username: msg.sender.username,
      avatar: msg.sender.avatarURL,
      self: msg.sender._id === user.id,
      time: msg.createdAt,
    }));

    setChatRooms((prev) => ({
      ...prev,
      ["🌍 General"]: {
        ...prev["🌍 General"],
        messages,
      },
    }));
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      const newMessage = {
        message: data.message,
        avatar: data.avatar,
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

  return { sendMessage, fetchGeneralMessages };
};

export default useMessageHandler;
