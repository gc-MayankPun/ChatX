import { createContext, useState } from "react";
import useToast from "../hooks/useToast";
import { getItem, setItem } from "../utils/localStorage";
import { v4 as uuidv4 } from "uuid";
import useChatRoomHandler from "../hooks/useChatRoomHandler";
import { gsap } from "gsap";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
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
    // Simulating an action (like selecting a room)
    const updatedRoom = { roomName, roomID, messages };
    setCurrentChatRoom(updatedRoom);
    setItem("currentChatRoom", updatedRoom);
  };

  const onRoomIconClick = async () => {
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

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      const sidebar = document.querySelector(".sidebar");
      gsap.to(sidebar, {
        width: "0",
        duration: 0.4,
      });
    }
    setChatRooms(updatedRooms);
    setItem("chatRooms", updatedRooms);
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
