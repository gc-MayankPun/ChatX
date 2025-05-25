import { gsap } from "gsap";

export const animateErrorMessage = () => {
  gsap.to(".error__chat-div", {
    opacity: 1,
    duration: 0.5,
    stagger: 1,
    ease: "bounce.in",
  });
};