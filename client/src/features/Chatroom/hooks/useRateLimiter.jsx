import { MAX_MESSAGES, WINDOW_MS } from "../../../utils/constants";
import { useRef } from "react";

const useRateLimiter = () => {
  const messageTimestampsRef = useRef([]);

  const canSendMessage = () => {
    const now = Date.now();
    // Remove timestamps older than WINDOW_MS
    messageTimestampsRef.current = messageTimestampsRef.current.filter(
      (ts) => now - ts < WINDOW_MS
    );

    if (messageTimestampsRef.current.length >= MAX_MESSAGES) {
      return false;
    }

    messageTimestampsRef.current.push(now);
    return true;
  };

  return { canSendMessage };
};

export default useRateLimiter;
