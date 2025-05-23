import { useChatRooms, useCurrentRoom } from "../../context/chatRoomContext";
import { useChatRoomActions } from "../../context/chatRoomContext";
import { insertDateDividers } from "../../utils/formatDateTime";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import useMessageListener from "../../hooks/useMessageListener";
import ChatroomMessagesList from "../ui/ChatroomMessagesList";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { useScroll } from "../../context/scrollContext";
import "../../stylesheets/new-message-indicator.css";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import SidebarToggler from "../ui/SidebarToggler";
import useToast from "../../hooks/useToast";
import "../../stylesheets/chat-room.css";
import { memo, useEffect } from "react";
import ChatForm from "../ui/ChatForm";

const ChatRoom = memo(() => {
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
});

const ChatroomScrollableContainer = memo(({ children, isGeneral = false }) => {
  const { isFetchingNextPage } = useInfiniteScroll();
  const { containerRef, scrollRef } = useScroll();
  const { handleScroll } = useAutoScroll();

  return (
    <div
      ref={containerRef}
      className="chat-room__messages"
      onScroll={handleScroll}
    >
      {isGeneral && isFetchingNextPage && <div>Loading...</div>}
      {children}
      <div id="scroll" ref={scrollRef} />
    </div>
  );
});

const ChatroomMessagesContainer = memo(({ room, isGeneral = false }) => {
  const processedMessages = room ? insertDateDividers(room?.messages) : [];
  const { scrollToBottom } = useAutoScroll();
  const { shouldAutoScroll } = useScroll();

  useEffect(() => {
    if (processedMessages.length === 0) return;

    if (shouldAutoScroll) {
      console.log("Fetching from useEffect...");
      scrollToBottom();
    }
  }, [processedMessages]);

  return (
    <div className="chat-room__messages-wrapper">
      <ChatroomScrollableContainer isGeneral={isGeneral}>
        {processedMessages.length === 0 ? (
          <p className="chat-room__skeleton-p">
            No chats yet. You're the one to kick it off! 🚀
          </p>
        ) : (
          <ChatroomMessagesList processedMessages={processedMessages} />
        )}
      </ChatroomScrollableContainer>
      {!shouldAutoScroll &&
        checkNewMessage(
          processedMessages[processedMessages.length - 1].messageID
        ) && <NewMessageIndicator scrollToBottom={scrollToBottom} />}
    </div>
  );
});

import { FaArrowCircleDown } from "react-icons/fa";
import { checkNewMessage } from "../../utils/checkNewMessage";
const NewMessageIndicator = ({ scrollToBottom }) => {
  return (
    <button
      onClick={scrollToBottom}
      tabIndex={0}
      aria-label="View new messages"
      className="new-message-indicator__button"
    >
      <span className="center-icon new-message-indicator__icon">
        <FaArrowCircleDown />
      </span>{" "}
      View New Messages
    </button>
  );
};

const ChatRoomTitle = memo(({ room }) => {
  const { leaveRoom } = useChatRoomActions();
  const { shareToast } = useToast();

  const handleRoomOptionsClick = () => {
    shareToast({
      payload: {
        roomName: room.roomName,
        roomID: room.roomID,
        leaveRoom,
      },
    });
  };

  return (
    <div className="chat-room__title-container">
      <SidebarToggler />
      <h1 className="chat-room__title" title={room.roomName}>
        {room.roomName}
      </h1>
      {room.roomID !== "🌍 General" && (
        <button
          className="chat-room__buttons chat-room__options"
          onClick={handleRoomOptionsClick}
        >
          <span className="center-icon">
            <PiDotsThreeOutlineVerticalFill />
          </span>
        </button>
      )}
    </div>
  );
});

const GeneralChat = memo(() => {
  const { data, status, error } = useInfiniteScroll();

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>{error.message}</div>;

  return <ChatroomMessagesContainer room={data} isGeneral={true} />;
});

export default memo(ChatRoom);
