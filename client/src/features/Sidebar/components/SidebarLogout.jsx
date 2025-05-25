import useAuthForm from "../../../hooks/useAuthForm";
import { ImExit } from "react-icons/im";

export const SidebarLogout = () => {
  const { handleLogout } = useAuthForm({ endpoint: "/logout" });

  return (
    <button className="sidebar-nav__button" onClick={handleLogout}>
      <ImExit /> Log Out
    </button>
  );
};
