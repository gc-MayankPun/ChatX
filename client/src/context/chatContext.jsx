import { createContext, useEffect, useState } from "react";
import useToast from "../hooks/useToast";
import { getItem, setItem } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";
import useChatRoomHandler from "../hooks/useChatRoomHandler";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const { createRoom, joinRoom } = useChatRoomHandler();
  const [currentChatRoom, setCurrentChatRoom] = useState(
    getItem("currentChatRoom") || null
  );
  const [chatRooms, setChatRooms] = useState(
    getItem("chatRooms") || {
      "🌍 General": {
        roomName: "🌍 General",
        roomID: "🌍 General",
        messages: [],
      },
    }
  );
  const { inputDecisionToast } = useToast();

  // Handle selecting a room
  const getClickedChat = (roomName, roomID, messages) => {
    if (isActionInProgress) return; // Prevent action if one is in progress
    setIsActionInProgress(true); // Disable further actions

    // Simulating an action (like selecting a room)
    const updatedRoom = { roomName, roomID, messages };
    setCurrentChatRoom(updatedRoom);
    setItem("currentChatRoom", updatedRoom);

    setIsActionInProgress(false); // Re-enabling the action if the current action is completed
  };

  const onRoomIconClick = async () => {
    if (isActionInProgress) return; // Prevent action if one is in progress
    setIsActionInProgress(true); // Disable further actions

    const roomAction = await inputDecisionToast({
      payload: {
        title: "Enter room name",
        inputField: "roomName",
        placeholder: "Enter room name",
        choicePrimary: "Join",
        choiceSecondary: "Create",
      },
      config: { position: "top-center" },
    });
    const { action, value } = roomAction;

    setIsActionInProgress(false); // Re-enabling the action if the current action is completed
    if (!action || !value) return;

    if (chatRooms[value]) {
      setCurrentChatRoom(chatRooms[value]);
      setItem("currentChatRoom", chatRooms[value]);
      return;
    }

    const randomID = uuidv4().replace(/-/g, "");
    let updatedRooms;
    if (action === "Create") {
      const roomID = `${randomID}::${value}`;
      createRoom(roomID, value);

      updatedRooms = {
        ...chatRooms,
        [roomID]: { roomName: value, roomID, messages: [] },
      };

      setCurrentChatRoom({ roomName: value, roomID, messages: [] });
      setItem("currentChatRoom", { roomName: value, roomID, messages: [] });
    } else {
      joinRoom(value);
      const roomID = value;
      const roomName = value.split("::")[1];

      updatedRooms = {
        ...chatRooms,
        [roomID]: { roomName, roomID, messages: [] },
      };

      setCurrentChatRoom({ roomName, roomID, messages: [] });
      setItem("currentChatRoom", { roomName, roomID, messages: [] });
    }

    setChatRooms(updatedRooms);
    setItem("chatRooms", updatedRooms);
    setIsActionInProgress(false); // Re-enabling the action if the current action is completed
  };

  return (
    <ChatContext.Provider
      value={{
        currentChatRoom,
        setCurrentChatRoom,
        chatRooms,
        setChatRooms,
        getClickedChat,
        onRoomIconClick,
        isActionInProgress,
        setIsActionInProgress,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
