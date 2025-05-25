import ChatMessage from "../../../features/Chatroom/components/ChatMessage";
const glitchedRobotImage = "/images/glitched-robot.png";
import { getRandomTime } from "../utils/getRandomTime";

const systemErrorMessages = [
  "⚠️ I blinked... and the chat thread vanished.",
  "This part of the system decided to ghost us.",
  "Something tripped over the wires. Probably me.",
  "That message took a wrong turn at the firewall.",
  "I swear it was working five seconds ago.",
  "System error: Logic went out for snacks, never returned.",
  "Oops. We lost the plot. And the page.",
  "Temporary hiccup. Or maybe a burp. Either way, it's gone.",
  "If you're reading this, the system glitched better than expected.",
  "Thread corrupted... possibly by vibes. Investigating.",
];

const errorFoundChat = [
  {
    username: "You",
    message: "Is something wrong?",
    self: true,
    avatar: "yes you",
    time: getRandomTime(),
  },
  ...systemErrorMessages
    .sort(() => 0.5 - Math.random()) // Gives randomize order
    .slice(0, 3)
    .map((msg) => ({
      username: "System",
      message: msg,
      self: false,
      avatar: glitchedRobotImage,
      time: getRandomTime(),
    })),
];

const ErrorPage = () => {
  return errorFoundChat.map((data) => {
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

export default ErrorPage;
