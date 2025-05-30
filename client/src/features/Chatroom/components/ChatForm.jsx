import AutoExpandingTextarea from "../../../components/ui/AutoExpandingTextarea";
import useMessageHandler from "../hooks/useMessageHandler";
import { ImSpinner2 } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import { memo, useState } from "react";

const ChatForm = ({ room }) => {
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useMessageHandler();

  const handleSendMessage = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    if (!isSending) sendMessage(inputValue, setInputValue, room, setIsSending);
  };

  return (
    <form className="chat-room__input-wrapper" onSubmit={handleSendMessage}>
      <AutoExpandingTextarea
        value={inputValue}
        isSending={isSending}
        onChange={setInputValue}
        onSubmit={handleSendMessage}
      />
      <button
        type="submit"
        disabled={!inputValue.trim() || isSending}
        title={isSending ? "Sending..." : "Send message"}
        className={`chat-room__send-button center-icon ${
          !inputValue.trim() ? "disabled" : ""
        }`}
      >
        {isSending ? <ImSpinner2 className="spin" /> : <IoSend />}
      </button>
    </form>
  );
};

export default memo(ChatForm);
