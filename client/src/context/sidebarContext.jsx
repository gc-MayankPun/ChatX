import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { isMobile } from "../utils/responsive";
import { gsap } from "gsap";

const SidebarStateContext = createContext();
const SidebarActionsContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(isMobile());
  const sidebarRef = useRef(null);

  const handleSidebarMenu = useCallback(() => {
    if (!sidebarRef?.current) return;

    gsap.to(sidebarRef.current, {
      width: isSidebarClosed ? "20rem" : "0",
      duration: 0.4,
      onComplete: () => setIsSidebarClosed((prev) => !prev),
    });
  }, [isSidebarClosed]);

  const openSidebar = useCallback(() => {
    if (isMobile() && sidebarRef?.current) {
      gsap.to(sidebarRef.current, {
        width: "20rem",
        duration: 0.4,
        onComplete: () => setIsSidebarClosed((prev) => !prev),
      });
    }
  }, []);

  const closeSidebar = useCallback(() => {
    if (!sidebarRef?.current) return;
    gsap.to(sidebarRef.current, {
      width: "0",
      duration: 0.4,
      onComplete: () => setIsSidebarClosed((prev) => !prev),
    });
  }, []);

  const stateValue = useMemo(
    () => ({ sidebarRef, isSidebarClosed }),
    [isSidebarClosed]
  );
  const actionValue = useMemo(
    () => ({ handleSidebarMenu, openSidebar, closeSidebar }),
    [handleSidebarMenu, openSidebar, closeSidebar]
  );
  return (
    <SidebarStateContext.Provider value={stateValue}>
      <SidebarActionsContext.Provider value={actionValue}>
        {children}
      </SidebarActionsContext.Provider>
    </SidebarStateContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarStateContext);
export const useSidebarActions = () => useContext(SidebarActionsContext);
