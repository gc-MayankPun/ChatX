import useChatRoomListener from "../hooks/useChatRoomListener";
import { generateRandomID } from "../utils/generateRandomID";
import { createContext, useContext, useState } from "react";
import { getItem, setItem } from "../utils/storage";
import useToast from "../hooks/useToast";

const ChatRoomActionsContext = createContext();
const CurrentRoomContext = createContext();
const ChatRoomsContext = createContext();

export const RoomContextProvider = ({ children }) => {
  const { emitCreateRoom, emitJoinRoom, emitLeaveRoom } = useChatRoomListener();
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
  const { showToast, inputDecisionToast } = useToast();

  // Create or Join room
  const joinOrCreateRoom = () => {
    return new Promise(async (resolve) => {
      // Don't allow user to create more room if the limit is hit
      const length = Object.keys(chatRooms).length;
      if (length > 7) {
        showToast({
          type: "info",
          payload:
            "Easy tiger! Even chat champs hit their limit. Take a breather 🐯⌛️ or ditch the room to free up some space — no hard feelings 😜🚪✨.",
          config: {
            autoClose: false,
            closeButton: true,
          },
        });
        return;
      }

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
        const randomID = generateRandomID();
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

      setChatRooms(updatedRooms);
      setItem("chatRooms", updatedRooms);
      resolve(true);
    });
  };

  // Join room through url
  const joinRoomThroughUrl = async (roomID) => {
    // Don't allow user to create more room if the limit is hit
    const length = Object.keys(chatRooms).length;
    if (length > 7) {
      showToast({
        payload:
          "Easy tiger! Even chat champs hit their limit. Take a breather 🐯⌛️ or ditch the room to free up some space — no hard feelings 😜🚪✨.",
        config: {
          autoClose: false,
          closeButton: true,
        },
      });
      return;
    }

    // If room already exists, Select that room
    if (chatRooms[roomID]) {
      setCurrentChatRoom(chatRooms[roomID]);
      setItem("currentChatRoom", chatRooms[roomID]);
      return;
    }

    emitJoinRoom(roomID);
    const roomName = roomID.split("::")[1];

    const updatedRooms = {
      ...chatRooms,
      [roomID]: { roomName, roomID, messages: [] },
    };

    setCurrentChatRoom({ roomName, roomID, messages: [] });
    setItem("currentChatRoom", { roomName, roomID, messages: [] });

    // autoCloseSidebarOnMobile();
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

    // setCurrentChatRoom(updatedRooms["🌍 General"]);
    // setItem("currentChatRoom", updatedRooms["🌍 General"]);

    setCurrentChatRoom(null);
    setItem("currentChatRoom", null);

    emitLeaveRoom(roomID);
  };

  // Update Chatrooms
  const updateRooms = (roomID, newMessage) => {
    if (!chatRooms) return;
    setChatRooms((prevRooms) => ({
      ...prevRooms,
      [roomID]: {
        ...prevRooms[roomID],
        messages: [...prevRooms[roomID].messages, newMessage],
      },
    }));
  };

  return (
    <ChatRoomsContext.Provider value={{ chatRooms, setChatRooms }}>
      <CurrentRoomContext.Provider
        value={{ currentChatRoom, setCurrentChatRoom }}
      >
        <ChatRoomActionsContext.Provider
          value={{
            joinOrCreateRoom,
            joinRoomThroughUrl,
            selectRoom,
            leaveRoom,
            updateRooms,
          }}
        >
          {children}
        </ChatRoomActionsContext.Provider>
      </CurrentRoomContext.Provider>
    </ChatRoomsContext.Provider>
  );
};

export const useChatRoomActions = () => useContext(ChatRoomActionsContext);
export const useCurrentRoom = () => useContext(CurrentRoomContext);
export const useChatRooms = () => useContext(ChatRoomsContext);
