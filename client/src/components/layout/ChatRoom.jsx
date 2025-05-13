import { useContext, useEffect, useRef } from "react";
import "../../stylesheets/chat-room.css";
import { GoSidebarCollapse } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../ui/ChatMessage";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import { SidebarContext } from "../../context/sidebarContext";
import { ChatContext } from "../../context/chatContext";
import useMessageHandler from "../../hooks/useMessageHandler";

const ChatRoom = () => {
  const { currentChatRoom, chatRooms } = useContext(ChatContext);
  const { openSidebar } = useContext(SidebarContext);
  const { sendMessage } = useMessageHandler();

  const scrollRef = useRef(null);

  const room = currentChatRoom ? chatRooms[currentChatRoom.roomID] : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [room?.messages]);

  if (!currentChatRoom || !room) return <ChatRoomSkeleton />;

  return (
    <div className="chat-room">
      <span className="toggle-sidebar center-icon" onClick={openSidebar}>
        <GoSidebarCollapse />
      </span>
      <h1 className="chat-room__title">{room.roomName}</h1>

      <div className="chat-room__messages-wrapper">
        <div className="chat-room__messages">
          {room.messages.length === 0 ? (
            <p className="chat-room__skeleton-p">
              No chats yet. You're the one to kick it off! 🚀
            </p>
          ) : (
            room.messages.map((msg, index) => {
              return (
                <ChatMessage
                  key={`${msg.roomName} | ${msg.roomID} | ${index}`}
                  self={msg.self}
                  username={msg.username}
                  avatar={msg.avatar}
                  message={msg.message}
                />
              );
            })
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="chat-room__input-section">
        <form
          className="chat-room__input-wrapper"
          onSubmit={(event) => sendMessage(event, room)}
        >
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
