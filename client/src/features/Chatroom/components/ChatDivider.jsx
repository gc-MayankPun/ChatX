import { memo } from "react";

const ChatDivider = ({ message }) => (
  <div className="chat-room__divider">
    <span>{message}</span>
  </div>
);

export default memo(ChatDivider);
