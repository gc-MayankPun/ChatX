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

const ChatroomScrollableContainer = memo(
  ({ children, scrollTrigger, isFetchingNextPage, fetchNextPage }) => {
    const { containerRef, scrollRef, handleScroll, scrollToBottom } =
      useAutoScroll(isFetchingNextPage, fetchNextPage);
    console.log("Scrolling Container...");

    // useEffect(() => {
    //   if (!scrollRef.current || scrollTrigger.length === 0) return;
    //   console.log("Scrolling...");

    //   if (isFetchingNextPage) {
    //     scrollToBottom(false); // force scroll
    //     return;
    //   }
    //   if (scrollTrigger.isSelf) {
    //     scrollToBottom(true); // force scroll
    //   }
    // }, [scrollTrigger.length, isFetchingNextPage, scrollTrigger.isSelf]);
    useEffect(() => {
      if (!scrollRef.current || scrollTrigger.length === 0) return;
      scrollToBottom();
    }, [scrollTrigger.length, isFetchingNextPage]);

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
  }
);

const ChatroomMessagesContainer = memo(
  ({ room, isFetchingNextPage, fetchNextPage }) => {
    const { user } = useUser();
    const processedMessages = room ? insertDateDividers(room?.messages) : [];
    const lastMessage = room?.messages[room.messages.length - 1];
    const isSentBySelf = lastMessage?.username === user.username;

    const { ref, inView } = useInView();
    console.log("Updating bitches...");

    useEffect(() => {
      if (inView) {
        fetchNextPage();
      }
    }, [inView, fetchNextPage]);

    return (
      <div className="chat-room__messages-wrapper">
        <ChatroomScrollableContainer
          scrollTrigger={{
            length: processedMessages.length,
            isSelf: isSentBySelf,
          }}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        >
          <div style={{ border: ".1rem solid green" }} ref={ref}>
            {isFetchingNextPage && "Loading..."}
          </div>
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
  }
);

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
  const { data, status, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteScroll();
  console.log("Loading bitches...");

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <ChatroomMessagesContainer
      room={data}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
});

export default memo(ChatRoom);
