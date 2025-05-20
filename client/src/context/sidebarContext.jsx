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

const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const sidebarRef = useRef(null);

  const handleSidebarMenu = useCallback(() => {
    if (!sidebarRef?.current) return;

    if (isMobile()) {
      gsap.to(sidebarRef.current, {
        width: "20rem",
        duration: 0.4,
      });
    } else {
      gsap.to(sidebarRef.current, {
        width: isSidebarClosed ? "20rem" : "0",
        duration: 0.4,
        onComplete: () => setIsSidebarClosed((prev) => !prev),
      });
    }
  }, [isSidebarClosed, sidebarRef]);

  const openSidebar = useCallback(() => {
    if (isMobile && sidebarRef?.current) {
      gsap.to(sidebarRef.current, {
        width: "20rem",
        duration: 0.4,
      });
    }
  }, [sidebarRef]);

  const closeSidebar = useCallback(() => {
    if (!sidebarRef?.current) return;
    gsap.to(sidebarRef.current, {
      width: "0",
      duration: 0.4,
      onComplete: () => setIsSidebarClosed((prev) => !prev),
    });
  }, [sidebarRef]);

  const value = useMemo(
    () => ({
      sidebarRef,
      handleSidebarMenu,
      openSidebar,
      closeSidebar,
      isSidebarClosed,
    }),
    [sidebarRef, handleSidebarMenu, openSidebar, closeSidebar, isSidebarClosed]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
