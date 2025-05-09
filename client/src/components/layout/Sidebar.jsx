import React, { useRef, useState } from "react";
import "../../stylesheets/sidebar.css";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import useAuthForm from "../../hooks/useAuthForm";
import { gsap } from "gsap";
import { showToast } from "../../utils/showToast";

const Sidebar = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const { handleLogout } = useAuthForm();
  const sidebarRef = useRef(null);

  const handleSidebarMenu = () => {
    const isMobile = window.innerWidth <= 768;
    const expandedWidth = isMobile ? "10rem" : "20rem";

    gsap.to(sidebarRef.current, {
      width: isSidebarClosed ? expandedWidth : "2.5rem",
      onComplete: () => {
        setIsSidebarClosed((prev) => !prev);
      },
    });
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
              src="https://imgs.search.brave.com/j5LM16TLCwSaSsi7q38kOH0TlC-PXW-O2Rs7N2G6ihc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3V0/ZS1hbmltZS1naXJs/LXBmcC15dWkteWFt/YWRhLXVzaW5nLXBo/b25lLWttYWI5M2ly/dGRkY2YwMm8uanBn"
              alt="user logo"
            />
          </div>
          <p className="user-username" title="gc_mayankpun">
            gc_mayankpun
          </p>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-nav__header">
            <p className="sidebar-nav__title">My chatroom</p>
            <span className="sidebar-nav__add-icon center-icon">
              <FaPlus />
            </span>
          </div>
          <ul className="sidebar-nav__list">
            <li className="sidebar-nav__item">Chat 1</li>
            <li className="sidebar-nav__item">Chat 2</li>
            <li className="sidebar-nav__item">Chat 3</li>
            <li className="sidebar-nav__item">Chat 4</li>
            <li className="sidebar-nav__item">Chat 5</li>
            <li className="sidebar-nav__item">Chat 6</li>
            <li className="sidebar-nav__item">Chat 7</li>
            <li className="sidebar-nav__item">Chat 8</li>
            <li className="sidebar-nav__item">Chat 9</li>
            <li className="sidebar-nav__item">Chat 10</li>
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
