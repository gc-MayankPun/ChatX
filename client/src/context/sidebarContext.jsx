import { createContext, useRef, useState } from "react";
import { gsap } from "gsap";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const sidebarRef = useRef(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const handleSidebarMenu = () => {
    if (!sidebarRef?.current) return;

    if (isMobile) {
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
        isMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
