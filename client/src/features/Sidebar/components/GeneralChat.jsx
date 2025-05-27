import { useChatRooms } from "../../../context/chatRoomContext";
import { useSelectRoom } from "../hooks/useSelectRoom";

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
