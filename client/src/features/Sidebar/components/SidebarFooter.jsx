import { useSidebarActions } from "../../../context/sidebarContext";
import { SidebarLogout } from "./SidebarLogout";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";

export const SidebarFooter = () => {
  const { closeSidebar } = useSidebarActions();
  const { customizeToast } = useToast();
  const navigate = useNavigate();

  const handleCustomizeToast = () => {
    customizeToast({
      payload: { closeSidebar, navigate },
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
