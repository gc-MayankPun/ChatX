import { getItem, setItem } from "./storage";

export function checkNewMessage(lastMessage) {
  const lastMessageID = getItem("lastMessageID");
  const isNew = lastMessageID !== lastMessage.messageID;

  const isNotFromSelf = !lastMessage.self;
  const showIndicator = isNew && isNotFromSelf;

  setItem("lastMessageID", lastMessage.messageID);
  return showIndicator;
}
