export const applyPseudoBackgroundStyle = (selector, imageUrl) => {
  const styleId = `pseudo-bg-${selector.replace(/\W/g, "")}`;
  let existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    ${selector}::before {
      background-image: url(${imageUrl});
      background-repeat: no-repeat; 
      background-position: center; 
      background-size: cover; 
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.4;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
};
