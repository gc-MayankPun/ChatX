import { useSidebarActions } from "../../../context/sidebarContext";
import { SidebarLogout } from "./SidebarLogout";
import useToast from "../../../hooks/useToast";
import { IoMdSettings } from "react-icons/io";

export const SidebarFooter = () => {
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
};
