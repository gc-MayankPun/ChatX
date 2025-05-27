import { ChatroomMessagesContainer } from "../Chatroom/components/ChatroomMessagesContainer";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import PendingState from "./components/PendingState";
import ErrorState from "./components/ErrorState";
import { memo } from "react";

export const GeneralChat = memo(() => {
  const { data, status, error } = useInfiniteScroll();

  if (status === "pending") return <PendingState />;
  if (status === "error") return <ErrorState error={error} />;

  return <ChatroomMessagesContainer room={data} isGeneral={true} />;
});
