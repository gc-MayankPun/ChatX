import { memo } from "react";

const DateDivider = ({ date }) => (
  <div className="chat-room__date-divider">
    <span>{date}</span>
  </div>
);

export default memo(DateDivider);
