import { ChatroomScrollableContainer } from "./ChatroomScrollableContainer";
import { insertDateDividers } from "../../../utils/formatDateTime";
import { checkNewMessage } from "../../../utils/checkNewMessage";
import { useAutoScroll } from "../../../hooks/useAutoScroll";
import { NewMessageIndicator } from "./NewMessageIndicator";
import { useScroll } from "../../../context/scrollContext";
import ChatroomMessagesList from "./ChatroomMessagesList";
import { memo, useEffect, useRef } from "react";

export const ChatroomMessagesContainer = memo(({ room, isGeneral = false }) => {
  const processedMessages = room ? insertDateDividers(room?.messages) : [];
  const latestMessage = processedMessages[processedMessages.length - 1];
  const { shouldAutoScroll, scrollRef } = useScroll();
  const { scrollToBottom } = useAutoScroll();
  const prevMessageIDRef = useRef(null);

  useEffect(() => {
    if (!latestMessage) return;

    // Check if the latest message is new or not
    const hasNewMessage = latestMessage.messageID !== prevMessageIDRef.current;
    prevMessageIDRef.current = latestMessage.messageID;

    // Return if the message is same
    if (!hasNewMessage) return;

    // If message sent by self, scroll to bottom regardless of scroll position
    if (latestMessage.self) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Scroll to bottom if user is near bottom
    if (shouldAutoScroll) {
      scrollToBottom();
    }
  }, [latestMessage?.messageID]);

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
      {shouldAutoScroll===false && checkNewMessage(latestMessage) && (
        <NewMessageIndicator scrollToBottom={scrollToBottom} />
      )}
    </div>
  );
});
