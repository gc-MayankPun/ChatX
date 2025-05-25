import { useScroll } from "../context/scrollContext";
import useInfiniteScroll from "./useInfiniteScroll";
import { useCallback, useRef } from "react";

export const useAutoScroll = (isGeneral = false) => {
  const { containerRef, scrollRef, shouldAutoScroll, setShouldAutoScroll } =
    useScroll();
  const { fetchNextPage, hasNextPage } = useInfiniteScroll();

  const isFetchingRef = useRef(false);
  const debounceTimerRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const threshold = clientHeight / 4;

    setShouldAutoScroll(distanceFromBottom <= threshold);

    // Debounce scrollTop === 0
    if (scrollTop === 0 && !isFetchingRef.current && hasNextPage && isGeneral) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

      debounceTimerRef.current = setTimeout(async () => {
        if (!isFetchingRef.current) {
          isFetchingRef.current = true; // Lock fetching

          await fetchNextPage();

          requestAnimationFrame(() => {
            containerRef.current.scrollTop = 20;
            isFetchingRef.current = false; // Unlock after adjustment
          });
        }
      }, 500);
    }
  }, [containerRef, fetchNextPage, hasNextPage, setShouldAutoScroll]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current || shouldAutoScroll) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shouldAutoScroll, scrollRef]);

  return {
    containerRef,
    scrollRef,
    handleScroll,
    shouldAutoScroll,
    scrollToBottom,
    setShouldAutoScroll,
  };
};
