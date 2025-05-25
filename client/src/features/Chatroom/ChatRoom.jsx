import { ChatroomMessagesContainer } from "./components/ChatroomMessagesContainer";
import { useChatRooms, useCurrentRoom } from "../../context/chatRoomContext";
import useMessageListener from "./hooks/useMessageListener";
import { ChatRoomTitle } from "./components/ChatroomTitle";
import { GeneralChat } from "../Generalchat/GeneralChat";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import ChatForm from "./components/ChatForm";
import "./styles/chat-room.css"
import { memo } from "react";

const ChatRoom = () => {
  const { currentChatRoom } = useCurrentRoom();
  const { chatRooms } = useChatRooms();
  useMessageListener();

  const room = currentChatRoom ? chatRooms[currentChatRoom.roomID] : null;
  if (!room) return <ChatRoomSkeleton />;

  return (
    <div className="chat-room">
      <ChatRoomTitle room={room} />

      {room.roomID === "🌍 General" ? (
        <GeneralChat />
      ) : (
        <ChatroomMessagesContainer room={room} />
      )}

      <div className="chat-room__input-section">
        <ChatForm room={room} />
      </div>
    </div>
  );
};

export default memo(ChatRoom);
