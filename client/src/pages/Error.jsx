import { useNavigate, useRouteError } from "react-router-dom";
import ChatMessage from "../components/ui/ChatMessage";
import "../stylesheets/error-page.css";
import { useEffect } from "react";
import { gsap } from "gsap";

const glitchedTime = [
  "12:0_",
  "23:4~",
  "99:99",
  "88:88",
  "13:⧗",
  "----",
  "14:3L",
  "1_:__",
  "25:61",
  "ERROR:TIME_NOT_FOUND",
  "14:32 PM",
  "00:0NaN",
];

const glitchedRobotImage = "/images/glitched-robot.png";

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const animateErrorMessage = () => {
  gsap.to(".error__chat-div", {
    opacity: 1,
    duration: 0.5,
    stagger: 1,
    ease: "bounce.in",
  });
};

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

const pageNotFoundChat = [
  {
    username: "You",
    message: `Looks like I'm lost at: ${window.location.href}`,
    self: true,
    avatar: "yes you",
    time: getRandomItem(glitchedTime),
  },
  {
    username: "System",
    message: "🤖 Umm... this chat thread went on vacation.",
    self: false,
    avatar: glitchedRobotImage,
    time: getRandomItem(glitchedTime),
  },
  {
    username: "System",
    message: "Either it never existed, or it got abducted by rogue code.",
    self: false,
    avatar: glitchedRobotImage,
    time: getRandomItem(glitchedTime),
  },
  {
    username: "System",
    message: "Try checking the URL or go back by clicking the button below.",
    self: false,
    avatar: glitchedRobotImage,
    time: getRandomItem(glitchedTime),
  },
];

const errorFoundChat = [
  {
    username: "You",
    message: "Is something wrong?",
    self: true,
    avatar: "yes you",
    time: getRandomItem(glitchedTime),
  },
  ...systemErrorMessages
    .sort(() => 0.5 - Math.random()) // Gives randomize order
    .slice(0, 3)
    .map((msg) => ({
      username: "System",
      message: msg,
      self: false,
      avatar: glitchedRobotImage,
      time: getRandomItem(glitchedTime),
    })),
];

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    animateErrorMessage();
  }, []);

  const is404Error = error.status === 404;
  return (
    <div className="error-wrapper">
      <div className="error__type">
        <h1>{is404Error ? "404 page error" : "Something went wrong"}</h1>
      </div>
      <div className="error__chat-wrapper">
        <div className="error__chat">
          {is404Error
            ? pageNotFoundChat.map((data) => {
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
              })
            : errorFoundChat.map((data) => {
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
              })}

          <div className="error__back-button-container error__chat-div">
            <button className="error__back-button" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
