import { useSidebar, useSidebarActions } from "../../context/sidebarContext";
import { useUser } from "../../context/userContext";
import useAuthForm from "../../hooks/useAuthForm";
import { isMobile } from "../../utils/responsive";
import { IoMdSettings } from "react-icons/io";
import useToast from "../../hooks/useToast";
import { FaPlus } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import "../../stylesheets/sidebar.css";
import { memo, useMemo } from "react";
import {
  useChatRoomActions,
  useChatRooms,
  useCurrentRoom,
} from "../../context/chatRoomContext";
import SidebarToggler from "../ui/SidebarToggler";

const Sidebar = memo(() => {
  console.log("Rendering Sidebar...");
  const { sidebarRef } = useSidebar();

  return (
    <aside ref={sidebarRef} className="sidebar">
      <SidebarToggler />
      <div className="sidebar-links">
        <UserDetails />
        <GeneralChat />
        <nav className="sidebar-nav">
          <div className="sidebar-nav__header">
            <p className="sidebar-nav__title">My chatroom</p>
            <RoomActionButton />
          </div>
          <SidebarLists />
        </nav>
        <SidebarFooter />
      </div>
    </aside>
  );
});

const RoomActionButton = memo(() => {
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
});

const UserDetails = memo(() => {
  const { user } = useUser();

  return (
    <div className="user">
      <div className="user_avatar">
        {user?.avatar ? (
          <img src={user.avatar} alt="User avatar" />
        ) : (
          <img src={"/images/blank-user.webp"} alt="user avatar img" />
        )}
      </div>
      <p className="user-username" title={user.username}>
        {user.username}
      </p>
    </div>
  );
});

const useSelectRoom = () => {
  const { currentChatRoom } = useCurrentRoom();
  const { selectRoom } = useChatRoomActions();
  const { closeSidebar } = useSidebarActions();

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

const SidebarLists = memo(() => {
  const { chatRooms } = useChatRooms();
  const { selectChatRoom } = useSelectRoom();

  return (
    <ul className="sidebar-nav__list">
      {Object.keys(chatRooms).length < 2 ? (
        <>
          <p className="sidebar-nav__skeleton-p">It's a bit lonely here...</p>
          <p className="sidebar-nav__skeleton-p">
            Add a room to get started! 👀
          </p>
        </>
      ) : (
        Object.keys(chatRooms).map((key, index) => {
          if (key === "🌍 General") return;
          const room = chatRooms[key];
          return (
            <li
              title={room.roomName}
              key={`${room.roomName} | ${room.roomID}`}
              onClick={() => selectChatRoom(room)}
              className="sidebar-nav__item"
            >
              {room.roomName}
            </li>
          );
        })
      )}
    </ul>
  );
});

const GeneralChat = memo(() => {
  const { chatRooms } = useChatRooms();
  const { selectChatRoom } = useSelectRoom();

  return (
    <p
      className="general-chat"
      onClick={() => selectChatRoom(chatRooms["🌍 General"])}
    >
      🌍 General
    </p>
  );
});

const SidebarFooter = memo(() => {
  const { closeSidebar } = useSidebarActions();
  const { customizeToast } = useToast();

  const handleCustomizeToast = () => {
    customizeToast({
      payload: { closeSidebar },
      config: { position: "top-center" },
    });
  };

  return (
    <div className="sidebar-nav__footer">
      <button className="sidebar-nav__button" onClick={handleCustomizeToast}>
        <IoMdSettings /> Customize
      </button>
      <SidebarLogout />
    </div>
  );
});

const SidebarLogout = memo(() => {
  const { handleLogout } = useAuthForm({ endpoint: "/logout" });

  return (
    <button className="sidebar-nav__button" onClick={handleLogout}>
      <ImExit /> Log Out
    </button>
  );
});

// export default Sidebar;
export default memo(Sidebar);
