import React from "react";

const ChatMessage = ({ username, avatar, message, self = false }) => {
  return (
    <div className={`chat-message ${self ? "chat-message-self" : ""}`}>
      <div
        className={`chat-message__content ${
          self ? "chat-message__content-self" : ""
        }`}
      >
        <p
          className={`chat-message__sender-name ${
            self ? "chat-message__sender-name-self" : ""
          }`}
        >
          {username}
        </p>
          <div className="chat-message__text">{message}</div>
          <span className="chat-message__time">12:00</span>
      </div>
      <div
        className={`chat-message__avatar ${
          self ? "chat-message__avatar-self" : "chat-message__avatar"
        }`}
      >
        <img
          className="chat-message__avatar-img"
          // src="https://imgs.search.brave.com/Urjknjp4X5z14_Ssyf_rKZwjwH4aecAYXQmq1gNKgEM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcmV0/cm8tZ2lybC1hbmlt/ZS1wZnAtNzRrNDQ4/ZXl5NmFlbmFhdy5q/cGc"
          src={avatar}
          alt={`${username} avatar`}
        />
      </div>
    </div>
  );
};

export default ChatMessage;
