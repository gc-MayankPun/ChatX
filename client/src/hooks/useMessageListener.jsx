import { useEffect } from "react";
import { generateRandomID } from "../utils/generateRandomID";
import { useChatRoom } from "../context/chatRoomContext";
import { useSocket } from "../context/socketContext";
import { useUser } from "../context/userContext";

const useMessageListener = () => {
  const { chatRooms, updateRooms } = useChatRoom();
  const { socket } = useSocket();
  const { user } = useUser();

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      const newMessage = {
        message: data.message,
        avatar: data.avatar,
        username: data.username,
        self: data.id === user.id,
        time: data.time,
        messageID: data.messageID,
      };

      updateRooms(data.roomID, newMessage);
    };

    const handleUserActivityMessage = ({ roomID, username, action }) => {
      // If User is already joined then don't show the message
      if (action === "join" && chatRooms[roomID]) return;

      const randomID = generateRandomID("user-activity-");
      const activityMessage = {
        type: action === "join" ? "user-join" : "user-left",
        messageID: randomID,
        message:
          action === "join"
            ? `${username} joined the room`
            : `${username} left the room`,
        time: new Date().toISOString(),
      };

      updateRooms(roomID, activityMessage);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("user-join", handleUserActivityMessage);
    socket.on("user-left", handleUserActivityMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user-join", handleUserActivityMessage);
      socket.off("user-left", handleUserActivityMessage);
    };
  }, [socket]);
};

export default useMessageListener;
