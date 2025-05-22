import { formatTime } from "../../utils/formatDateTime";
import ChatDivider from "./ChatDivider";
import ChatMessage from "./ChatMessage";
import { memo,} from "react";;

const ChatroomMessagesList = memo(({ processedMessages }) => {
  console.log("Rendering Message Lists...")
  return (
    <>
      {processedMessages.map((msg, index) => {
        if (msg.type === "date") {
          return <ChatDivider key={msg.dateId} message={msg.date} />;
        }
        if (msg.type === "user-left" || msg.type === "user-join") {
          return <ChatDivider key={msg.messageID} message={msg.message} />;
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
      })}
    </>
  );
});

export default ChatroomMessagesList;
