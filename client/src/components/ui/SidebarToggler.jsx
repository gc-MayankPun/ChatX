import { useSidebar, useSidebarActions } from "../../context/sidebarContext";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { memo } from "react";

const SidebarToggler = () => {
  const { isSidebarClosed } = useSidebar();
  const { handleSidebarMenu } = useSidebarActions();

  return (
    <button
      className="chat-room__buttons toggle-sidebar"
      onClick={handleSidebarMenu}
    >
      <span className="center-icon">
        {isSidebarClosed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
      </span>
    </button>
  );
};

export default memo(SidebarToggler);
