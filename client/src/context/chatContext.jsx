import { createContext, useState } from "react";
import useToast from "../hooks/useToast";
import { getItem, setItem } from "../utils/localStorage";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [isActionInProgress, setIsActionInProgress] = useState(false);
  const [generalChat, setGeneralChat] = useState(
    getItem("generalChat") || null
  );
  const [currentChatRoom, setCurrentChatRoom] = useState(
    getItem("currentChatRoom") || null
  );
  // const [chatRooms, setChatRooms] = useState([
  //   {
  //     roomName: "Chat 1",
  //     roomID: "RANDOM_STRING_1",
  //     messages: [{ message: "Hello", sender: "", senderPic: "" }],
  //   },
  //   {
  //     roomName: "Chat 2",
  //     roomID: "RANDOM_STRING_2",
  //     messages: [{ message: "Hello from chat 2", sender: "", senderPic: "" }],
  //   },
  // ]);
  const [chatRooms, setChatRooms] = useState(getItem("chatRooms") || []);
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

    const updatedRooms = [
      ...chatRooms,
      {
        roomName: value,
        roomID: "RANDOM_STRING",
        messages: [],
      },
    ];
    setChatRooms(updatedRooms);
    setItem("chatRooms", updatedRooms);

    setIsActionInProgress(false); // Re-enabling the action if the current action is completed
  };

  return (
    <ChatContext.Provider
      value={{
        generalChat,
        setGeneralChat,
        currentChatRoom,
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
