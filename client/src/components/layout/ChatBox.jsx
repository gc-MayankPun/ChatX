import React, { useContext } from "react";
import "../../stylesheets/chat-box.css";
import { UserContext } from "../../context/UserContext";

const ChatBox = () => {
  const { user } = useContext(UserContext);
  return <div className="chat-box">Hello {user.username}</div>;
};

export default ChatBox;
