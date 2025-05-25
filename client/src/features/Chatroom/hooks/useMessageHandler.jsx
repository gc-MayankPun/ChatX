import { useChatRoomActions } from "../../../context/chatRoomContext";
import { generateRandomID } from "../../../utils/generateRandomID";
import { censorMessage } from "../../../utils/censorMessage";
import { axiosInstance } from "../../../api/axiosInstance";
import { useSocket } from "../../../context/socketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../context/userContext";
import useToast from "../../../hooks/useToast";

const useMessageHandler = () => {
  const { updateRooms } = useChatRoomActions();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { socket } = useSocket();
  const { user } = useUser();

  const sendGeneralMessage = async (currentChatRoom, messageContent) => {
    const data = await axiosInstance({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/send`,
      payload: { message: messageContent },
    });

    const { message, sender, _id, createdAt, updatedAt } =
      data.generalChat.newMessage;

    const newMessage = {
      roomID: currentChatRoom.roomID,
      message,
      username: sender.username,
      avatar: sender.avatarURL,
      self: true,
      time: createdAt,
      messageID: _id,
    };

    // After emitting the socket message
    // console.log("Sending General Message...");

    socket.emit("send_message", newMessage);
    // updateRooms(currentChatRoom.roomID, newMessage);
  };

  const sendMessage = async (
    rawContent,
    setInputValue,
    currentChatRoom,
    setSending
  ) => {
    try {
      if (setSending) setSending(true); // Start sending state

      const messageContent = censorMessage(rawContent);

      if (currentChatRoom.roomID === "🌍 General") {
        await sendGeneralMessage(currentChatRoom, messageContent);
        await queryClient.invalidateQueries({ queryKey: ["general-messages"] });
        setInputValue("");
        return;
      }

      const timestamp = new Date().toISOString();
      const randomID = generateRandomID("msg-");
      const newMessage = {
        roomID: currentChatRoom.roomID,
        message: messageContent,
        username: user.username,
        avatar: user.avatar,
        self: true,
        time: timestamp,
        messageID: randomID,
      };

      socket.emit("send_message", newMessage);
      updateRooms(currentChatRoom.roomID, newMessage);
      setInputValue("");
    } catch (err) {
      showToast({
        type: "error",
        payload: "Failed to send message. Please try again.",
      });
    } finally {
      if (setSending) setSending(false); // End sending state
    }
  };

  return { sendMessage };
};

export default useMessageHandler;
