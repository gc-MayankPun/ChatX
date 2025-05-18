import { useChatRoom } from "../../context/chatRoomContext";
import { useSidebar } from "../../context/sidebarContext";
import { useUser } from "../../context/userContext";
import useAuthForm from "../../hooks/useAuthForm";
import { GoSidebarExpand } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import useToast from "../../hooks/useToast";
import { FaPlus } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import "../../stylesheets/sidebar.css";
import { memo } from "react";

const Sidebar = () => {
  console.log("Sidebar")
  const { handleLogout } = useAuthForm({ endpoint: "/logout" });
  const { chatRooms, selectRoom, joinOrCreateRoom } = useChatRoom();
  const { sidebarRef, closeSidebar } = useSidebar();
  const { showToast } = useToast();
  const { user } = useUser();

  const selectChatRoom = (room) => {
    const { roomName, roomID, messages } = room;
    selectRoom(roomName, roomID, messages);
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  return (
    <aside ref={sidebarRef} className="sidebar">
      <span className="toggle-sidebar center-icon" onClick={closeSidebar}>
        <GoSidebarExpand />
      </span>
      <div className="sidebar-links">
        <div className="user">
          <div className="user_avatar">
            <img src={user.avatar} alt="user avatr img" />
          </div>
          <p className="user-username" title={user.username}>
            {user.username}
          </p>
        </div>

        <p
          className="general-chat"
          onClick={() => selectChatRoom(chatRooms["🌍 General"])}
        >
          🌍 General
        </p>
        <nav className="sidebar-nav">
          <div className="sidebar-nav__header">
            <p className="sidebar-nav__title">My chatroom</p>
            <button
              className="sidebar-nav__add-icon center-icon"
              onClick={joinOrCreateRoom}
            >
              <FaPlus />
            </button>
          </div>
          <ul className="sidebar-nav__list">
            {Object.keys(chatRooms).map((key, index) => {
              if (key === "🌍 General") return;
              const room = chatRooms[key];
              console.log(room.roomName)
              return (
                <li
                  key={`${room.roomName} | ${room.roomID}`}
                  onClick={() => selectChatRoom(room)}
                  className="sidebar-nav__item"
                >
                  {room.roomName}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="sidebar-nav__footer">
          <button
            className="sidebar-nav__button"
            onClick={() =>
              showToast({
                type: "info",
                payload: "Feature will be implemented soon",
              })
            }
          >
            <IoMdSettings /> Settings
          </button>
          <button className="sidebar-nav__button" onClick={handleLogout}>
            <ImExit /> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

// export default Sidebar;
export default memo(Sidebar);

