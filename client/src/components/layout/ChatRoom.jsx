import { useContext, useEffect, useRef } from "react";
import "../../stylesheets/chat-room.css";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoSend } from "react-icons/io5";
import ChatMessage from "../ui/ChatMessage";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import { SidebarContext } from "../../context/sidebarContext";
import { ChatContext } from "../../context/chatContext";
import useMessageHandler from "../../hooks/useMessageHandler";
import useToast from "../../hooks/useToast";

const ChatRoom = () => {
  const { currentChatRoom, chatRooms } = useContext(ChatContext);
  const { openSidebar, handleSidebarMenu, isSidebarClosed, isMobile } =
    useContext(SidebarContext);
  const { sendMessage } = useMessageHandler();
  const { showToast, shareToast } = useToast();

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
      <div className="chat-room__title-container">
        <button
          className="chat-room__buttons toggle-sidebar"
          onClick={handleSidebarMenu}
        >
          <span className="center-icon">
            {isMobile ? (
              <GoSidebarCollapse />
            ) : isSidebarClosed ? (
              <GoSidebarCollapse />
            ) : (
              <GoSidebarExpand />
            )}
          </span>
        </button>
        {/* <span className="toggle-sidebar center-icon" >
          <GoSidebarCollapse />
        </span> */}
        <h1 className="chat-room__title">{room.roomName}</h1>
        {room.roomID !== "🌍 General" && (
          <button
            className="chat-room__buttons chat-room__options"
            onClick={() => shareToast({ payload: { shareURL: room.roomID } })}
          >
            <span className="center-icon">
              {/* <BsThreeDotsVertical /> */}
              <PiDotsThreeOutlineVerticalFill />
            </span>
          </button>
        )}
      </div>

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
