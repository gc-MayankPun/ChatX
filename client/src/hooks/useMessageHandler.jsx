import { useEffect, useCallback } from "react";
import { useChatRoom } from "../context/chatRoomContext";
import { useSocket } from "../context/socketContext";
import { useUser } from "../context/userContext";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const useMessageHandler = () => {
  const { setChatRooms, updateRooms } = useChatRoom();
  const { socket } = useSocket();
  const { user } = useUser();

  const sendGeneralMessage = async (currentChatRoom, messageContent) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/send`,
      { message: messageContent },
      {
        withCredentials: true,
      }
    );

    const { message, sender, _id, createdAt, updatedAt } =
      response.data.generalChat.newMessage;

    const newMessage = {
      roomID: currentChatRoom.roomID,
      message,
      username: sender.username,
      avatar: sender.avatarURL,
      self: true,
      time: createdAt,
      messageID: _id,
    };

    socket.emit("send_message", newMessage);
      console.log("SENDED")
    updateRooms(currentChatRoom.roomID, newMessage);
  };

  const sendMessage = useCallback(
    async (event, currentChatRoom) => {
      event.preventDefault();
      const messageContent = event.target.chatInput.value.trim();
      if (!socket || messageContent === "") return;

      if (currentChatRoom.roomID === "🌍 General") {
        await sendGeneralMessage(currentChatRoom, messageContent);
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
        messageID: uuidv4().replace(/-/g, ""),
      };

      socket.emit("send_message", newMessage);
      console.log("SENDED")
      updateRooms(currentChatRoom.roomID, newMessage);

      event.target.chatInput.value = "";
    },
    [socket, user.username, updateRooms]
  );

  const fetchGeneralMessages = useCallback(async () => {
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
      messageID: msg._id,
    }));

    setChatRooms((prev) => ({
      ...prev,
      ["🌍 General"]: {
        ...prev["🌍 General"],
        messages,
      },
    }));
  }, [user.id, setChatRooms]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      console.log("MESSAGE RECEIVED");
      const newMessage = {
        message: data.message,
        avatar: data.avatar,
        username: data.username,
        self: data.id === user.id,
        time: data.time,
        messageId: data.messageId,
      };
      
      updateRooms(data.roomID, newMessage); 
    };
    
    const handleUserLeftMessage = ({ roomID, username }) => {
      const newMessage = {
        message: `${username} left the room`,
        avatar: "/images/glitched-robot.png",
        username: "System",
        self: false,
        time: new Date().toISOString(),
      };

      updateRooms(roomID, newMessage);
    };

    console.log("Using messages handler");
    socket.on("receive_message", handleReceiveMessage);
    socket.on("user-left", handleUserLeftMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user-left", handleUserLeftMessage);
    };
    }, [socket, updateRooms]);
  // }, [socket]);

  return { sendMessage, fetchGeneralMessages };
};

export default useMessageHandler;
