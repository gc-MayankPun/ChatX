import { useSelectRoom } from "../Sidebar/hooks/useSelectRoom";
import { useChatRooms } from "../../context/chatRoomContext";

export const SelectGeneralChat = () => {
  const { selectChatRoom } = useSelectRoom();
  const { chatRooms } = useChatRooms();

  return (
    <p
      className="general-chat"
      onClick={() => selectChatRoom(chatRooms["🌍 General"])}
    >
      🌍 General
    </p>
  );
};
