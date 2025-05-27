import { DELETED_USERNAME } from "../../../utils/constants";
import { memo } from "react";

const ChatMessage = ({ username, avatar, message, self = false, time }) => {
  return (
    <div className={`chat-message ${self ? "chat-message-self" : ""}`}>
      <div
        className={`chat-message__content ${
          self ? "chat-message__content-self" : ""
        }`}
      >
        <p
          className={`chat-message__sender-name ${
            username === DELETED_USERNAME ? "deleted-user__name" : ""
          } ${self ? "chat-message__sender-name-self" : ""} `}
        >
          {username}
        </p>
        <div className="chat-message__text">{message}</div>
        <span className="chat-message__time">{time}</span>
      </div>
      <div
        className={`chat-message__avatar ${
          self ? "chat-message__avatar-self" : "chat-message__avatar"
        }`}
      >
        <img
          className="chat-message__avatar-img"
          src={avatar}
          alt={`${username} avatar`}
        />
      </div>
    </div>
  );
};

export default memo(ChatMessage);
