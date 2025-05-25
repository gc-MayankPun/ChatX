import { SelectGeneralChat } from "../Generalchat/SelectGeneralChat";
import { RoomActionButton } from "./components/RoomActionButton";
import SidebarToggler from "../../components/ui/SidebarToggler";
import { useSidebar } from "../../context/sidebarContext";
import { SidebarFooter } from "./components/SidebarFooter";
import { SidebarLists } from "./components/SidebarLists";
import { UserDetails } from "./components/UserDetails";
import "./styles/sidebar.css";
import { memo } from "react";

const Sidebar = memo(() => {
  const { sidebarRef } = useSidebar();

  return (
    <aside ref={sidebarRef} className="sidebar">
      <SidebarToggler />
      <div className="sidebar-links">
        <UserDetails />
        <SelectGeneralChat />
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

export default memo(Sidebar);
