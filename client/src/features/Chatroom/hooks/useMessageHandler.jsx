import { useChatRoomActions } from "../../../context/chatRoomContext";
import { generateRandomID } from "../../../utils/generateRandomID";
import { MESSAGE_CONTENT_LIMIT } from "../../../utils/constants";
import { censorMessage } from "../../../utils/censorMessage";
import { axiosInstance } from "../../../api/axiosInstance";
import { useSocket } from "../../../context/socketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../../../context/userContext";
import useToast from "../../../hooks/useToast";
import useRateLimiter from "./useRateLimiter";

const useMessageHandler = () => {
  const { updateRooms } = useChatRoomActions();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { socket } = useSocket();
  const { user } = useUser();
  const { canSendMessage } = useRateLimiter();

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

    // Emitting the socket message
    socket.emit("send_message", newMessage);
  };

  const sendMessage = async (
    rawContent,
    setInputValue,
    currentChatRoom,
    setSending
  ) => {
    try {
      // Rate limit check
      if (!canSendMessage()) {
        showToast({
          type: "error",
          payload: "You're messaging too quickly. Please slow down a little 😊",
        });
        return;
      }

      // Length check
      if (rawContent.length > MESSAGE_CONTENT_LIMIT) {
        showToast({
          type: "error",
          payload:
            "That message is a bit too long. Try shortening it a little ✂️",
        });
        return;
      }

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
      if (err.response?.status === 429) {
        showToast({
          type: "error",
          payload:
            "You're messaging too quickly. Please slow down a little 😊",
        });
        return;
      }
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
