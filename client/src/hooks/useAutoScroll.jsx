import { useCallback, useRef, useState } from "react";

export const useAutoScroll = (isFetchingNextPage, fetchNextPage) => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const isFetchingRef = useRef(null);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    // const threshold = clientHeight * 0.5;
    const threshold = clientHeight * 0.8;

    setShouldAutoScroll(distanceFromBottom <= threshold);

    // if (scrollTop === 0 && !isFetchingRef.current) {
    //   isFetchingRef.current = true;
    //   fetchNextPage().finally(() => {
    //     isFetchingRef.current = false;
    //   });
    // }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current && shouldAutoScroll) {
      console.log("Scrolling to bottom...");
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Skipping scroll:", {
        scrollRef: scrollRef.current,
        shouldAutoScroll,
      });
    }
  }, [shouldAutoScroll]);

  return {
    containerRef,
    scrollRef,
    handleScroll,
    shouldAutoScroll,
    scrollToBottom,
    setShouldAutoScroll,
  };
};
