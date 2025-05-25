import { fetchGeneralMessage } from "../api/fetchGeneralMessage";
import { DEFAULT_AVATAR_URL } from "../utils/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUser } from "../context/userContext";
import { useMemo } from "react";

const useInfiniteScroll = () => {
  const { user } = useUser();
  const {
    data,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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
      .map((msg) => {
        const sender = msg.sender || {};
        return {
          roomID: "🌍 General",
          message: msg.message,
          username: sender.username || "Deleted User",
          avatar: sender.avatarURL || DEFAULT_AVATAR_URL,
          self: msg.sender?._id === user.id,
          time: msg.createdAt,
          messageID: msg._id,
        };
      });
  }, [data, user.id]);

  return {
    error,
    status,
    data: { messages },
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useInfiniteScroll;
