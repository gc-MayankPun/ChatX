import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useAutoScroll } from "../../../hooks/useAutoScroll";
import { useScroll } from "../../../context/scrollContext";
import Spinner from "../../../components/ui/Spinner";
import { memo } from "react";

export const ChatroomScrollableContainer = memo(
  ({ children, isGeneral = false }) => {
    const { isFetchingNextPage } = useInfiniteScroll();
    const { handleScroll } = useAutoScroll(isGeneral);
    const { containerRef, scrollRef } = useScroll();

    return (
      <div
        ref={containerRef}
        className="chat-room__messages"
        onScroll={handleScroll}
      >
        {isGeneral && isFetchingNextPage && <Spinner />}
        {children}
        <div id="scroll" ref={scrollRef} />
      </div>
    );
  }
);
