import { useContext } from "react";
import "../../stylesheets/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import useAuthForm from "../../hooks/useAuthForm";
import { showToast } from "../../utils/showToast";
import { UserContext } from "../../context/UserContext";
import { SidebarContext } from "../../context/sidebarContext";

const Sidebar = () => {
  const { handleLogout } = useAuthForm();
  const { getClickedChat } = useContext(UserContext);
  const { closeSidebar } = useContext(SidebarContext);
  const { sidebarRef, handleSidebarMenu, isSidebarClosed } =
    useContext(SidebarContext);

  const selectChatRoom = (event) => {
    getClickedChat(event);
    closeSidebar();
  };

  return (
    <aside ref={sidebarRef} className="sidebar">
      <span className="toggle-sidebar center-icon" onClick={handleSidebarMenu}>
        {isSidebarClosed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      </span>
      <div className="sidebar-links">
        <div className="user">
          <div className="user-logo-container">
            <img
              src="https://imgs.search.brave.com/BN-PxGdAhUuBkFHUQYdDLX98Y-pXzKd0ZW_zoiniG-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvYW5pbWUtcGZw/LXBpY3R1cmVzLXN0/Nnh6YW95MjU2bm8y/aHcuanBn"
              alt="user logo"
            />
          </div>
          <p className="user-username" title="gc_mayankpun">
            gc_mayankpun
          </p>
        </div>
        <p className="general-chat" onClick={selectChatRoom}>
          🌍 General
        </p>
        <nav className="sidebar-nav">
          <div className="sidebar-nav__header">
            <p className="sidebar-nav__title">My chatroom</p>
            <span className="sidebar-nav__add-icon center-icon">
              <FaPlus />
            </span>
          </div>
          <ul className="sidebar-nav__list">
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 1
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 2
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 3
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 4
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 5
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 6
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 7
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 8
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 9
            </li>
            <li onClick={selectChatRoom} className="sidebar-nav__item">
              Chat 10
            </li>
          </ul>
        </nav>
        <div className="sidebar-nav__footer">
          <button
            className="sidebar-nav__button"
            onClick={() =>
              showToast("info", "Feature will be implemented soon")
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
