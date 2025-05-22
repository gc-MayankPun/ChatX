import { useChatRooms, useCurrentRoom } from "../../context/chatRoomContext";
import { useChatRoomActions } from "../../context/chatRoomContext";
import { formatTime, insertDateDividers } from "../../utils/formatDateTime";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import useMessageListener from "../../hooks/useMessageListener";
import ChatroomMessagesList from "../ui/ChatroomMessagesList";
import { useAutoScroll } from "../../hooks/useAutoScroll";
import { useUser } from "../../context/userContext";
import ChatRoomSkeleton from "./ChatRoomSkeleton";
import SidebarToggler from "../ui/SidebarToggler";
import useToast from "../../hooks/useToast";
import "../../stylesheets/chat-room.css";
import { memo, useEffect } from "react";
import ChatForm from "../ui/ChatForm";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import ChatMessage from "../ui/ChatMessage";
import { useInView } from "react-intersection-observer";

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
        <GeneralChat room={room} />
      ) : (
        <ChatroomMessagesContainer room={room} />
      )}

      <div className="chat-room__input-section">
        <ChatForm room={room} />
      </div>
    </div>
  );
});

const ChatroomScrollableContainer = memo(({ children, scrollTrigger }) => {
  const { containerRef, scrollRef, handleScroll, scrollToBottom } =
    useAutoScroll();

  useEffect(() => {
    if (!scrollRef.current || scrollTrigger.length === 0) return;
    scrollToBottom(scrollTrigger.isSelf);
  }, [scrollTrigger.length, scrollTrigger.isSelf]);

  return (
    <div
      ref={containerRef}
      className="chat-room__messages"
      onScroll={handleScroll}
    >
      {children}
      <div
        ref={scrollRef}
        style={{ border: ".1rem solid red", float: "left", clear: "both" }}
      />
    </div>
  );
});

const ChatroomMessagesContainer = memo(({ room }) => {
  const { user } = useUser();
  const processedMessages = room ? insertDateDividers(room?.messages) : [];
  const lastMessage = room?.messages[room.messages.length - 1];
  const isSentBySelf = lastMessage?.username === user.username;

  return (
    <div className="chat-room__messages-wrapper">
      <ChatroomScrollableContainer
        scrollTrigger={{
          length: processedMessages.length,
          isSelf: isSentBySelf,
        }}
      >
        {processedMessages.length === 0 ? (
          <p className="chat-room__skeleton-p">
            No chats yet. You're the one to kick it off! 🚀
          </p>
        ) : (
          <ChatroomMessagesList processedMessages={processedMessages} />
        )}
      </ChatroomScrollableContainer>
    </div>
  );
});

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

const GeneralChat = memo(({ room }) => {
  const { status, error, data, isFetchingNextPage, fetchNextPage } =
    useInfiniteScroll();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div style={{ textAlign: "center", fontSize: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.pages.map((page) => (
          <div key={page.currentPage}>
            {page.data.map((message) => {
              return (
                <ChatMessage
                  key={message._id}
                  username={message.sender.username}
                  avatar={message.sender.avatarURL}
                  message={message.message}
                  self={false}
                  time={formatTime(message.createdAt)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ border: ".1rem solid green" }} ref={ref}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </div>
  );
});

export default memo(ChatRoom);
