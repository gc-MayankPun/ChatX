import { FaArrowCircleDown } from "react-icons/fa";
import "../styles/new-message-indicator.css"

export const NewMessageIndicator = ({ scrollToBottom }) => {
  return (
    <button
      onClick={scrollToBottom}
      tabIndex={0}
      aria-label="View new messages"
      className="new-message-indicator__button"
    >
      <span className="center-icon new-message-indicator__icon">
        <FaArrowCircleDown />
      </span>{" "}
      View New Messages
    </button>
  );
};
