import { createContext, useContext, useState } from "react";
import useChatRoomHandler from "../hooks/useChatRoomHandler";
import { getItem, setItem } from "../utils/storage";
import useToast from "../hooks/useToast";
import { v4 as uuidv4 } from "uuid";

const RoomContext = createContext(null);

export const RoomContextProvider = ({ children }) => {
  const { emitCreateRoom, emitJoinRoom, emitLeaveRoom } = useChatRoomHandler();
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

  // Create or Join room
  const joinOrCreateRoom = async () => {
    const roomAction = await inputDecisionToast({
      payload: {
        title: "Join or Create room",
        inputField: "roomName",
        placeholder: "Enter room name or id",
        choicePrimary: "Join",
        choiceSecondary: "Create",
      },
      config: { position: "top-center" },
    });
    const { action, inputValue } = roomAction;
    if (!action || !inputValue) return;

    // If room already exists, Select that room
    if (chatRooms[inputValue]) {
      setCurrentChatRoom(chatRooms[inputValue]);
      setItem("currentChatRoom", chatRooms[inputValue]);
      return;
    }

    let updatedRooms;
    if (action === "Create") {
      // Generate random ID for new rooms
      const randomID = uuidv4().replace(/-/g, "");
      const roomID = `${randomID}::${inputValue}`;
      emitCreateRoom(roomID, inputValue);

      updatedRooms = {
        ...chatRooms,
        [roomID]: { roomName: inputValue, roomID, messages: [] },
      };

      setCurrentChatRoom({ roomName: inputValue, roomID, messages: [] });
      setItem("currentChatRoom", {
        roomName: inputValue,
        roomID,
        messages: [],
      });
    } else {
      emitJoinRoom(inputValue);
      const roomID = inputValue;
      const roomName = inputValue.split("::")[1];

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

  // Simulate an action (like selecting a room)
  const selectRoom = (roomName, roomID, messages) => {
    // Check if the selected room is already selected
    if (currentChatRoom?.roomID === roomID) return;

    const updatedRoom = { roomName, roomID, messages };
    setCurrentChatRoom(updatedRoom);
    setItem("currentChatRoom", updatedRoom);
  };

  // Leave a room
  const leaveRoom = (roomID) => {
    const updatedRooms = { ...chatRooms };
    delete updatedRooms[roomID];

    setChatRooms(updatedRooms);
    setItem("chatRooms", updatedRooms);

    setCurrentChatRoom(updatedRooms["🌍 General"]);
    setItem("currentChatRoom", updatedRooms["🌍 General"]);

    emitLeaveRoom(roomID);
  };

  // Update Chatrooms
  const updateRooms = (roomID, newMessage) => {
    setChatRooms((prevRooms) => ({
      ...prevRooms,
      [roomID]: {
        ...prevRooms[roomID],
        messages: [...prevRooms[roomID].messages, newMessage],
      },
    }));

    // setItem("chatRooms", updatedRooms);
  };

  return (
    <RoomContext.Provider
      value={{
        setChatRooms,
        chatRooms,
        setCurrentChatRoom,
        currentChatRoom,
        selectRoom,
        joinOrCreateRoom,
        leaveRoom,
        updateRooms,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useChatRoom = () => useContext(RoomContext);
