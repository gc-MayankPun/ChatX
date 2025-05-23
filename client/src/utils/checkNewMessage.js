import { getItem, setItem } from "./storage";

export function checkNewMessage(messageID) {
  const lastMessageID = getItem("lastMessageID");
  const isNew = lastMessageID !== messageID;
  setItem("lastMessageID", messageID);
  return isNew;
}
