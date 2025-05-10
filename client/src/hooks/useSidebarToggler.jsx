import { useState } from "react";
import { gsap } from "gsap";

const useSidebarToggler = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const handleSidebarMenu = () => {
    const sidebar = document.querySelector(".sidebar");

    if (isMobile) {
      gsap.to(sidebar, {
        width: "0",
        duration: 0.4,
      });
    } else {
      gsap.to(sidebar, {
        width: isSidebarClosed ? "20rem" : "2.5rem",
        duration: 0.4,
        onComplete: () => {
          setIsSidebarClosed((prev) => !prev);
        },
      });
    }
  };

  const openSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (isMobile && sidebar) {
      gsap.to(sidebar, {
        width: "15rem",
        duration: 0.4,
      });
    }
  };

  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (isMobile && sidebar) {
      gsap.to(sidebar, {
        width: "0",
        duration: 0.4,
      });
    }
  };

  return { handleSidebarMenu, openSidebar, closeSidebar, isSidebarClosed };
};

export default useSidebarToggler;
