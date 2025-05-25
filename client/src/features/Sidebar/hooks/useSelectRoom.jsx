import { useChatRoomActions, useCurrentRoom } from "../../../context/chatRoomContext";
import { useSidebarActions } from "../../../context/sidebarContext";
import { isMobile } from "../../../utils/responsive";

export const useSelectRoom = () => {
  const { currentChatRoom } = useCurrentRoom();
  const { closeSidebar } = useSidebarActions();
  const { selectRoom } = useChatRoomActions();

  const selectChatRoom = (room) => {
    const { roomName, roomID, messages } = room;
    if (currentChatRoom && currentChatRoom.roomID === roomID) return;

    selectRoom(roomName, roomID, messages);
    if (isMobile()) {
      closeSidebar();
    }
  };

  return { selectChatRoom };
};
