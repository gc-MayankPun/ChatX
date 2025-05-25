import { useChatRoomActions } from "../../../context/chatRoomContext";
import { useSidebarActions } from "../../../context/sidebarContext";
import { isMobile } from "../../../utils/responsive";
import { FaPlus } from "react-icons/fa";

export const RoomActionButton = () => {
  const { joinOrCreateRoom } = useChatRoomActions();
  const { closeSidebar } = useSidebarActions();

  const handleClick = async () => {
    await joinOrCreateRoom();
    if (isMobile()) {
      closeSidebar();
    }
  };

  return (
    <button className="sidebar-nav__add-icon center-icon" onClick={handleClick}>
      <FaPlus />
    </button>
  );
};
