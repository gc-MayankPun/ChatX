import { memo, useEffect, useMemo, useRef, useState } from "react";
import { formatTime, insertDateDividers } from "../../utils/formatDateTime";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import AutoExpandingTextarea from "../ui/AutoExpandingTextarea";
import useMessageListener from "../../hooks/useMessageListener";
import useMessageHandler from "../../hooks/useMessageHandler";
import { useChatRoom } from "../../context/chatRoomContext";
import { useSidebar } from "../../context/sidebarContext";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import { isMobile } from "../../utils/responsive";
import ChatMessage from "../ui/ChatMessage";
import useToast from "../../hooks/useToast";
import ChatDivider from "../ui/ChatDivider";
import { ImSpinner2 } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import "../../stylesheets/chat-room.css";

const ChatRoom = () => {
  const { handleSidebarMenu, isSidebarClosed } = useSidebar();
  const { currentChatRoom, chatRooms } = useChatRoom();
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useMessageHandler();
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

  if (!currentChatRoom || !room) return <ChatRoomSkeleton />;

  const handleSendMessage = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    if (!isSending) sendMessage(inputValue, setInputValue, room, setIsSending);
  };

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
        <form className="chat-room__input-wrapper" onSubmit={handleSendMessage}>
          <AutoExpandingTextarea
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSendMessage}
            isSending={isSending}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isSending}
            title={isSending ? "Sending..." : "Send message"}
            className={`chat-room__send-button center-icon ${
              !inputValue.trim() ? "disabled" : ""
            }`}
          >
            {isSending ? <ImSpinner2 className="spin" /> : <IoSend />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(ChatRoom);
