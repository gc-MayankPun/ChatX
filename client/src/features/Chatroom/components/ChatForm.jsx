import InputTextArea from "../../../components/ui/InputTextArea";
import useMessageHandler from "../hooks/useMessageHandler";
import { memo, useEffect, useRef, useState } from "react"; 
import { ImSpinner2 } from "react-icons/im";
import { IoSend } from "react-icons/io5";

const ChatForm = ({ room }) => {
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useMessageHandler();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue === "") {
      handleResize();
    }
  }, [inputValue]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    if (!isSending)
      sendMessage(inputRef, inputValue, setInputValue, room, setIsSending);
  };

  const handleResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";

      const maxRows = 5;
      const lineHeight = 24;
      const maxHeight = lineHeight * maxRows;

      const scrollHeight = inputRef.current.scrollHeight;

      inputRef.current.style.overflowY =
        scrollHeight > maxHeight ? "auto" : "hidden";
      inputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    handleResize();
  };

  return (
    <form className="chat-room__input-wrapper" onSubmit={handleSendMessage}>
      <InputTextArea
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        handleResize={handleResize}
        handleChange={handleChange}
        isSending={isSending}
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
