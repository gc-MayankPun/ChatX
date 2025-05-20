import { gsap } from "gsap";

export const isMobile = () => {
  return typeof window !== "undefined" && window.innerWidth <= 768;
};

export const autoCloseSidebarOnMobile = () => {
  if (isMobile()) {
    const sidebar = document.querySelector(".sidebar");
    gsap.to(sidebar, {
      width: "0",
      duration: 0.4,
    });
  }
};
