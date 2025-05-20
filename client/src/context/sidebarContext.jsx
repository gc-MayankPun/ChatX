import { createContext, useContext, useRef, useState } from "react";
import { isMobile } from "../utils/responsive";
import { gsap } from "gsap";

const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const sidebarRef = useRef(null);

  const handleSidebarMenu = () => {
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
  };

  const openSidebar = () => {
    if (isMobile && sidebarRef?.current) {
      gsap.to(sidebarRef.current, {
        width: "20rem",
        duration: 0.4,
      });
    }
  };

  const closeSidebar = () => {
    if (!sidebarRef?.current) return;
    gsap.to(sidebarRef.current, {
      width: "0",
      duration: 0.4,
      onComplete: () => setIsSidebarClosed((prev) => !prev),
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarRef,
        handleSidebarMenu,
        openSidebar,
        closeSidebar,
        isSidebarClosed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
