import { useContext, useEffect } from "react";
import "../../stylesheets/chat-room.css";
import { GoSidebarCollapse } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../ui/ChatMessage";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import { SidebarContext } from "../../context/sidebarContext";
import { ChatContext } from "../../context/chatContext";

const ChatRoom = () => {
  useEffect(() => {
    console.log("Chatroom Mounted");
  }, []);

  const { currentChatRoom } = useContext(ChatContext);
  const { openSidebar } = useContext(SidebarContext);

  if (!currentChatRoom) return <ChatRoomSkeleton />;

  return (
    <div className="chat-room">
      <span className="toggle-sidebar center-icon" onClick={openSidebar}>
        <GoSidebarCollapse />
      </span>
      <h1 className="chat-room__title">
        {/* <FaUsers /> Chat Room */}
        {/* <FaUsers /> {currentChatRoom} */}
        {currentChatRoom.roomName}
      </h1>

      <div className="chat-room__messages-wrapper">
        <div className="chat-room__messages">
          {currentChatRoom.messages.length === 0 ? (
            <p className="chat-room__skeleton-p">
              No chats yet. You're the one to kick it off! 🚀
            </p>
          ) : (
            currentChatRoom.messages.map((msg, index) => {
              return (
                <ChatMessage
                  key={`${msg.roomName} | ${msg.roomID} | ${index}`}
                  message={msg.message}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="chat-room__input-section">
        <form className="chat-room__input-wrapper">
          <input
            type="text"
            name="chatInput"
            id="chat-input"
            placeholder="Type a message..."
            autoComplete="off"
          />
          <button className="chat-room__send-button">
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
