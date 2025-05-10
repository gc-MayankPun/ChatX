import { useContext } from "react";
import "../../stylesheets/chat-room.css";
import { UserContext } from "../../context/UserContext";
import { GoSidebarCollapse } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../ui/ChatMessage";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import { SidebarContext } from "../../context/sidebarContext";

const ChatRoom = () => {
  const { user, currentChatRoom } = useContext(UserContext);
  const { openSidebar } = useContext(SidebarContext);

  if (!currentChatRoom) return <ChatRoomSkeleton />;

  return (
    <div className="chat-room">
      <span className="toggle-sidebar center-icon" onClick={openSidebar}>
        <GoSidebarCollapse />
      </span>
      <h1 className="chat-room__title">
        {/* <FaUsers /> Chat Room */}
        <FaUsers /> {currentChatRoom}
      </h1>

      <div className="chat-room__messages-wrapper">
        <div className="chat-room__messages">
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
          <ChatMessage />
        </div>
      </div>

      <div className="chat-room__input-section">
        <div className="chat-room__input-wrapper">
          <input
            type="text"
            name="chat-input"
            id="chat-input"
            placeholder="Type a message..."
          />
          <button className="chat-room__send-button">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
