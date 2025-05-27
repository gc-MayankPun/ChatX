import CSSRulePlugin from "gsap/CSSRulePlugin";
import { gsap } from "gsap";

gsap.registerPlugin(CSSRulePlugin);

export const toastAnimation = (isToastCalled) => {
  const rule = CSSRulePlugin.getRule(".app-wrapper::before");
  gsap.to(rule, {
    cssRule: {
      opacity: isToastCalled ? 0.4 : 0,
      zIndex: isToastCalled ? 102 : -1,
    },
    ease: "power3.out",
    duration: 0.3,
  });
};
