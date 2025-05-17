import { useEffect, useContext, useCallback } from "react";
// import useSocket from "./useSocket";
import { ChatContext } from "../context/chatContext";
import { setItem } from "../utils/localStorage";
import { UserContext } from "../context/userContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSocket } from "../context/socketContext";
// import { formatTime } from "../utils/formatTime";

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

  // FIX: Messages are not being sent or received properly

  const sendGeneralMessage = async (currentChatRoom, messageContent) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/send`,
      { message: messageContent },
      {
        withCredentials: true,
      }
    );

    const { message, sender, createdAt, updatedAt } =
      response.data.generalChat.newMessage;

    const newMessage = {
      roomID: currentChatRoom.roomID,
      message,
      username: sender.username,
      avatar: sender.avatarURL,
      self: true,
      time: createdAt,
    };

    // console.log(newMessage);
    socket.emit("send_message", newMessage);

    // fetchGeneralMessages()
    updateChatRoomsWithMessage(currentChatRoom.roomID, newMessage);
  };

  const sendMessage = useCallback(
    async (event, currentChatRoom) => {
      event.preventDefault();
      const messageContent = event.target.chatInput.value.trim();
      if (!socket || messageContent === "") return;

      if (currentChatRoom.roomID === "🌍 General") {
        await sendGeneralMessage(currentChatRoom, messageContent);
        // await fetchGeneralMessages()
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

      socket.emit("send_message", newMessage);
      updateChatRoomsWithMessage(currentChatRoom.roomID, newMessage);

      event.target.chatInput.value = "";
    },
    [socket, user.username, updateChatRoomsWithMessage]
  );

  const fetchGeneralMessages = useCallback(async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/receiveAll`,
      { withCredentials: true }
    );

    console.log(response);

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
  });

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      console.log("Received message data:", data);
      const newMessage = {
        message: data.message,
        avatar: data.avatar,
        username: data.username,
        self: data.id === user.id,
        time: data.time,
      };

      updateChatRoomsWithMessage(data.roomID, newMessage);
    };

    console.log("message received");

    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, updateChatRoomsWithMessage]);

  return { sendMessage, fetchGeneralMessages };
};

export default useMessageHandler;
