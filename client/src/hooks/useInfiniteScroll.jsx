import { fetchGeneralMessage } from "../api/fetchGeneralMessage";
import { useInfiniteQuery } from "@tanstack/react-query";
import ChatMessage from "../components/ui/ChatMessage";
import { formatTime } from "../utils/formatDateTime";
import { useUser } from "../context/userContext";
import { useMemo } from "react";

const useInfiniteScroll = () => {
  const { user } = useUser();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["general-messages"],
      queryFn: fetchGeneralMessage,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 0,
    });

  const messages = useMemo(() => {
    return data?.pages
      ?.slice()
      ?.reverse() // So earliest page is first
      .flatMap((page) => page.data)
      .map((msg) => ({
        roomID: "🌍 General",
        message: msg.message,
        username: msg.sender.username,
        avatar: msg.sender.avatarURL,
        self: msg.sender._id === user.id,
        time: msg.createdAt,
        messageID: msg._id,
      }));
  }, [data, user.id]);

  return {
    error,
    status,
    data: { messages },
    fetchNextPage,
    isFetchingNextPage,
  };

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
