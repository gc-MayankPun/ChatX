import { fetchGeneralMessage } from "../api/fetchGeneralMessage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ChatMessage from "../components/ui/ChatMessage";
import { formatTime } from "../utils/formatDateTime";

const useInfiniteScroll = () => {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["general-messages"],
      queryFn: fetchGeneralMessage,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return status === "pending" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>{error.message}</div>
  ) : (
    <div style={{ textAlign: "center", fontSize: "2rem" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data.pages.map((page) => (
          <div key={page.currentPage}>
            {page.data.map((message) => {
              return (
                <ChatMessage
                  key={message._id}
                  username={message.sender.username}
                  avatar={message.sender.avatarURL}
                  message={message.message}
                  self={false}
                  time={formatTime(message.createdAt)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ border: ".1rem solid green" }} ref={ref}>
        {isFetchingNextPage && "Loading..."}
      </div>
    </div>
  );
};

export default useInfiniteScroll;