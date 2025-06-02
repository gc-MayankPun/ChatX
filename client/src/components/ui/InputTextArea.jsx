const InputTextArea = ({
  inputRef,
  handleKeyDown,
  handleResize,
  handleChange,
  isSending,
}) => {
  return (
    <textarea
      ref={inputRef}
      name="message"
      id="message"
      rows={1}
      disabled={isSending}
      className="prompt-area"
      placeholder="Enter your prompt here..."
      onKeyDown={handleKeyDown}
      onInput={handleResize}
      onChange={handleChange}
    ></textarea>
  );
};

export default InputTextArea;
