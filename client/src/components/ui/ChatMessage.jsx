import React from "react";

const ChatMessage = () => {
  return (
    <div className="chat-message">
      <div className="chat-message__content">
        <p className="chat-message__sender-name">gc_mayank_pun</p>
        <div className="chat-message__text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt,
          nemo.
        </div>
      </div>
      <div className="chat-message__avatar">
        <img
          className="chat-message__avatar-img"
          src="https://imgs.search.brave.com/Urjknjp4X5z14_Ssyf_rKZwjwH4aecAYXQmq1gNKgEM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcmV0/cm8tZ2lybC1hbmlt/ZS1wZnAtNzRrNDQ4/ZXl5NmFlbmFhdy5q/cGc"
          alt="message sender avatar"
        />
      </div>
    </div>
  );
};

export default ChatMessage;
