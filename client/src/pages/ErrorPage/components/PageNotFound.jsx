import ChatMessage from "../../../features/Chatroom/components/ChatMessage";
import { GLITCHED_ROBOT_IMAGE } from "../../../utils/constants";
import { getRandomTime } from "../utils/getRandomTime";

const pageNotFoundChat = [
  {
    username: "You",
    message: `Looks like I'm lost at: ${window.location.href}`,
    self: true,
    avatar: "yes you",
    time: getRandomTime(),
  },
  {
    username: "System",
    message: "🤖 Umm... this chat thread went on vacation.",
    self: false,
    avatar: GLITCHED_ROBOT_IMAGE,
    time: getRandomTime(),
  },
  {
    username: "System",
    message: "Either it never existed, or it got abducted by rogue code.",
    self: false,
    avatar: GLITCHED_ROBOT_IMAGE,
    time: getRandomTime(),
  },
  {
    username: "System",
    message: "Try checking the URL or go back by clicking the button below.",
    self: false,
    avatar: GLITCHED_ROBOT_IMAGE,
    time: getRandomTime(),
  },
];

const PageNotFound = () => {
  return pageNotFoundChat.map((data) => {
    const { username, message, self, avatar, time } = data;

    return (
      <div
        className="error__chat-div"
        key={`${username}-${time}-${message.slice(0, 10)}`}
      >
        <ChatMessage
          username={username}
          message={message}
          self={self}
          avatar={avatar}
          time={time}
        />
      </div>
    );
  });
};

export default PageNotFound;
