import { useCallback, useRef, useState } from "react";

export const useAutoScroll = () => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    // const threshold = clientHeight * 0.5;
    const threshold = clientHeight * 0.8;

    setShouldAutoScroll(distanceFromBottom <= threshold);
  }, []);

  const scrollToBottom = useCallback(
    (force = false) => {
      if (scrollRef.current && (shouldAutoScroll || force)) {
        console.log("Scrolling to bottom...");
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("Skipping scroll:", {
          scrollRef: scrollRef.current,
          shouldAutoScroll,
          force,
        });
      }
    },
    [shouldAutoScroll]
  );

  return {
    containerRef,
    scrollRef,
    handleScroll,
    shouldAutoScroll,
    scrollToBottom,
    setShouldAutoScroll,
  };
};
