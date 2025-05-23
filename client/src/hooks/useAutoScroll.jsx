import { useScroll } from "../context/scrollContext";
import useInfiniteScroll from "./useInfiniteScroll";
import { useCallback, useRef } from "react";

export const useAutoScroll = () => {
  const { containerRef, scrollRef, shouldAutoScroll, setShouldAutoScroll } =
    useScroll();
  const { fetchNextPage } = useInfiniteScroll();
  const isFetchingRef = useRef(false);

  const handleScroll = useCallback(async () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const threshold = clientHeight / 4;

    setShouldAutoScroll(distanceFromBottom <= threshold);

    if (scrollTop === 0 && !isFetchingRef.current) {
      console.log("Top reached. Fetching older messages...");
      isFetchingRef.current = true; // Lock fetching

      await fetchNextPage();

      requestAnimationFrame(() => {
        containerRef.current.scrollTop = 20;
        isFetchingRef.current = false; // Unlock after adjustment
      });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current || shouldAutoScroll) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
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
