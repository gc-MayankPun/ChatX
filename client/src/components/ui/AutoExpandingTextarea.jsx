import { useRef, useEffect, useCallback } from "react";

const AutoExpandingTextarea = ({ value, onChange, onSubmit, isSending}) => {
  const textareaRef = useRef(null);
  const mirrorRef = useRef(null);

  useEffect(() => {
    // When `value` changes, update mirror and resize textarea
    if (mirrorRef.current && textareaRef.current) {
      mirrorRef.current.textContent = value + "\n"; // Force extra space for line break

      const maxHeight = 80; // 5rem (1rem = 16px)
      const desiredHeight = mirrorRef.current.scrollHeight; // Content height
      const finalHeight = Math.min(desiredHeight, maxHeight); // Clamp height

      textareaRef.current.style.height = `${finalHeight}px`;
      textareaRef.current.style.overflowY =
        desiredHeight > maxHeight ? "auto" : "hidden";
    }
  }, [value]);

  // Handles Enter key to submit, Shift+Enter for newline
  const submitForm = useCallback((event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      onSubmit(event);
    }
  }, [onSubmit]);

  // Update value in parent
  const handleInputChange = useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);

  return (
    <div
      style={{
        position: "relative",
        width: "calc(100% - 3rem)",
        display: "flex",
        alignItems: "flex-end",
        flexShrink: 0,
      }}
    >
      {/* Hidden mirror element */}
      <div
        ref={mirrorRef}
        style={{
          visibility: "hidden",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          fontFamily: "inherit",
          fontSize: "1rem",
          lineHeight: "1.5",
          width: "100%",
          maxHeight: "5rem",
        }}
      />

      {/* Actual textarea */}
      <textarea
        ref={textareaRef}
        id="chat-input"
        name={"chatInput"}
        value={value}
        disabled={isSending}
        onKeyDown={submitForm}
        onChange={handleInputChange}
        placeholder="Type your message..."
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#111",
          color: "white",
          border: "none",
          outline: "none",
          resize: "none",
          fontFamily: "inherit",
          fontSize: "1rem",
          lineHeight: "1.5",
          overflowX: "hidden",
          overflowY: "hidden",
          transition: "height 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default AutoExpandingTextarea;
