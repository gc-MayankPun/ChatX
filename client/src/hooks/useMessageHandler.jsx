import { useState, useCallback, useEffect } from "react";
import useSocket from "./useSocket";

const useMessageHandler = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);

  const sendMessage = useCallback((event) => {
    event.preventDefault();
    const messageContent = event.target.chatInput.value;

    if (socket && messageContent.trim() !== "") {
      socket.emit("send_message", { message: messageContent });
      setMessages(prev => [...prev, { message: messageContent, self: true }]);
      event.target.chatInput.value = "";
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handler = (data) => {
      setMessages(prev => [...prev, { message: data.message, self: false }]);
    };

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler); // Clean up
    };
  }, [socket]);

  return { sendMessage, messages };
};

export default useMessageHandler;
