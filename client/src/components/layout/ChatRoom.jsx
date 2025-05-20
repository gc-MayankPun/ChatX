import { applyPseudoBackgroundStyle } from "../../utils/applyPseudoBackgroundStyle";
import { useChatRooms, useCurrentRoom } from "../../context/chatRoomContext";
import { formatTime, insertDateDividers } from "../../utils/formatDateTime";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import useMessageListener from "../../hooks/useMessageListener";
import { useSidebar } from "../../context/sidebarContext";
import { memo, useEffect, useMemo, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import { isMobile } from "../../utils/responsive";
import ChatMessage from "../ui/ChatMessage";
import useToast from "../../hooks/useToast";
import ChatDivider from "../ui/ChatDivider";
import "../../stylesheets/chat-room.css";
import ChatForm from "../ui/ChatForm";

const ChatRoom = () => {
  const { handleSidebarMenu, isSidebarClosed } = useSidebar();
  const { chatRooms } = useChatRooms();
  const { currentChatRoom } = useCurrentRoom();
  const { activeTheme } = useTheme();
  const { shareToast } = useToast();
  useMessageListener();

  const scrollRef = useRef(null);

  const room = currentChatRoom ? chatRooms[currentChatRoom.roomID] : null;

  const processedMessages = useMemo(() => {
    return room ? insertDateDividers(room?.messages) : [];
  }, [room?.messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [room?.messages.length, room?.roomID]);

  useEffect(() => {
    if (activeTheme) {
      applyPseudoBackgroundStyle(
        ".chat-room__messages-wrapper",
        activeTheme.link
      );
    }
  }, [activeTheme.link]);

  if (!currentChatRoom || !room) return <ChatRoomSkeleton />;

  return (
    <div className="chat-room">
      <div className="chat-room__title-container">
        <button
          className="chat-room__buttons toggle-sidebar"
          onClick={handleSidebarMenu}
        >
          <span className="center-icon">
            {isMobile() ? (
              <GoSidebarCollapse />
            ) : isSidebarClosed ? (
              <GoSidebarCollapse />
            ) : (
              <GoSidebarExpand />
            )}
          </span>
        </button>
        <h1 className="chat-room__title" title={room.roomName}>
          {room.roomName}
        </h1>
        {room.roomID !== "🌍 General" && (
          <button
            className="chat-room__buttons chat-room__options"
            onClick={() =>
              shareToast({
                payload: { roomName: room.roomName, roomID: room.roomID },
              })
            }
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
            processedMessages.map((msg, index) => {
              if (msg.type === "date") {
                return <ChatDivider key={msg.dateId} message={msg.date} />;
              }
              if (msg.type === "user-left" || msg.type === "user-join") {
                return (
                  <ChatDivider key={msg.messageID} message={msg.message} />
                );
              }

              return (
                <ChatMessage
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
        <ChatForm room={room} />
      </div>
    </div>
  );
};

export default memo(ChatRoom);
