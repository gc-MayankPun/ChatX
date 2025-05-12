import { useContext, useEffect } from "react";
import "../../stylesheets/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import useAuthForm from "../../hooks/useAuthForm";
import { SidebarContext } from "../../context/sidebarContext";
import { ChatContext } from "../../context/chatContext";
import { UserContext } from "../../context/userContext";
import useToast from "../../hooks/useToast";

const Sidebar = () => {
  useEffect(() => {
    console.log("Sidebar Mounted");
  }, []);

  const { handleLogout } = useAuthForm();
  const { chatRooms, getClickedChat, onRoomIconClick } =
    useContext(ChatContext);
  const { user } = useContext(UserContext);
  const { sidebarRef, handleSidebarMenu, isSidebarClosed, closeSidebar } =
    useContext(SidebarContext);
  const { showToast } = useToast();

  const selectChatRoom = (room) => {
    const { roomName, roomID, messages } = room;
    getClickedChat(roomName, roomID, messages);
    closeSidebar();
  };

  const selectGeneralChatRoom = () => {
    getClickedChat("🌍 General", "GENERAL_CHAT_BOLTE", [
      { message: "Hello", sender: "", senderPic: "" },
      { message: "Hola", sender: "", senderPic: "" },
      { message: "Hi", sender: "", senderPic: "" },
      { message: "Konnichiwa", sender: "", senderPic: "" },
      { message: "Namaste", sender: "", senderPic: "" },
    ]);
    closeSidebar();
  };

  return (
    <aside ref={sidebarRef} className="sidebar">
      <span className="toggle-sidebar center-icon" onClick={handleSidebarMenu}>
        {isSidebarClosed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      </span>
      <div className="sidebar-links">
        <div className="user">
          <div className="user_avatar">
            <img
              src={user.avatar || "/images/blank-user.webp"}
              alt="user avatr img"
            />
          </div>
          <p className="user-username" title={user.username}>
            {user.username}
          </p>
        </div>

        <p className="general-chat" onClick={selectGeneralChatRoom}>
          🌍 General
        </p>
        <nav className="sidebar-nav">
          <div className="sidebar-nav__header">
            <p className="sidebar-nav__title">My chatroom</p>
            <button
              className="sidebar-nav__add-icon center-icon"
              onClick={onRoomIconClick}
            >
              <FaPlus />
            </button>
          </div>
          <ul className="sidebar-nav__list">
            {chatRooms.length === 0 ? (
              <>
                <p className="sidebar-nav__skeleton-p">
                  It's a bit lonely here... Add a room to get started! 👀
                </p>
              </>
            ) : (
              chatRooms.map((room) => {
                return (
                  <li
                    test={`${room.roomName} | ${room.roomID}`}
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

export default Sidebar;
