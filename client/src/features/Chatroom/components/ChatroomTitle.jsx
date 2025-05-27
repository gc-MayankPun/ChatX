import { useChatRoomActions } from "../../../context/chatRoomContext";
import SidebarToggler from "../../../components/ui/SidebarToggler";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import useToast from "../../../hooks/useToast";
import { memo } from "react";

export const ChatRoomTitle = memo(({ room }) => {
  const { leaveRoom } = useChatRoomActions();
  const { shareToast } = useToast();

  const handleRoomOptionsClick = () => {
    shareToast({
      payload: {
        roomName: room.roomName,
        roomID: room.roomID,
        leaveRoom,
      },
    });
  };

  return (
    <div className="chat-room__title-container">
      <SidebarToggler />
      <h1 className="chat-room__title" title={room.roomName}>
        {room.roomName}
      </h1>
      {room.roomID !== "🌍 General" && (
        <button
          className="chat-room__buttons chat-room__options"
          onClick={handleRoomOptionsClick}
        >
          <span className="center-icon">
            <PiDotsThreeOutlineVerticalFill />
          </span>
        </button>
      )}
    </div>
  );
});