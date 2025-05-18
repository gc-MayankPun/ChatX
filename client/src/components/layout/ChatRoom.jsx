import { memo, useEffect, useMemo, useRef } from "react";
import { formatTime, insertDateDividers } from "../../utils/formatDateTime";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import useMessageHandler from "../../hooks/useMessageHandler";
import { useChatRoom } from "../../context/chatRoomContext";
import { useSidebar } from "../../context/sidebarContext";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import ChatMessage from "../ui/ChatMessage";
import useToast from "../../hooks/useToast";
import DateDivider from "../ui/DateDivider";
import { IoSend } from "react-icons/io5";
import "../../stylesheets/chat-room.css";

const ChatRoom = () => {
  console.log("Chat Room");
  const { handleSidebarMenu, isSidebarClosed, isMobile } = useSidebar();
  const { sendMessage, fetchGeneralMessages } = useMessageHandler();
  const { currentChatRoom, chatRooms } = useChatRoom();
  const { shareToast } = useToast();

  const scrollRef = useRef(null);

  const room = currentChatRoom ? chatRooms[currentChatRoom.roomID] : null;
  const processedMessages = useMemo(() => {
    return room ? insertDateDividers(room?.messages) : [];
  }, [room?.messages]);

  useEffect(() => {
    // if (room?.roomID === "🌍 General") {
    //   fetchGeneralMessages();
    // }

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [room?.messages.length, room?.roomID, fetchGeneralMessages]);

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
        <h1 className="chat-room__title">{room.roomName}</h1>
        {room.roomID !== "🌍 General" && (
          <button
            className="chat-room__buttons chat-room__options"
            onClick={() => shareToast({ payload: { shareURL: room.roomID } })}
          >
            <span className="center-icon">
              <PiDotsThreeOutlineVerticalFill />
            </span>
          </button>
        )}
      </div>

      <div className="chat-room__messages-wrapper">
        <div className="chat-room__messages">
          {processedMessages.length === 0 ? (
            <p className="chat-room__skeleton-p">
              No chats yet. You're the one to kick it off! 🚀
            </p>
          ) : (
            processedMessages.map((msg) => {
              if (msg.type === "date") {
                return <DateDivider key={msg.id} date={msg.date} />;
              }
              return (
                <ChatMessage
                  messageID={msg.messageID}
                  key={msg.messageID}
                  self={msg.self}
                  username={msg.username}
                  avatar={msg.avatar}
                  message={msg.message}
                  time={formatTime(msg.time)}
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

export default memo(ChatRoom);
