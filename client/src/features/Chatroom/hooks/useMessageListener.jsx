import { useChatRoomActions, useChatRooms } from "../../../context/chatRoomContext";
import { generateRandomID } from "../../../utils/generateRandomID";
import { useSocket } from "../../../context/socketContext";
import { useUser } from "../../../context/userContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useMessageListener = () => {
  const { updateRooms } = useChatRoomActions();
  const queryClient = useQueryClient();
  const { chatRooms } = useChatRooms();
  const { socket } = useSocket();
  const { user } = useUser();

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data) => {
      queryClient.invalidateQueries({ queryKey: ["general-messages"] });
      const newMessage = {
        message: data.message,
        avatar: data.avatar,
        username: data.username,
        userID: data.userID,
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
