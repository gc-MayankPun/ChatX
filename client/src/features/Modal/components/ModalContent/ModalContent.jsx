import { ModalBgThemeContent } from "./ModalBgThemeContent";
import { ModalUserContent } from "./ModalUserContent";
import { memo } from "react";

export const ModalContent = memo(({ activeTab, closeToast,navigate }) => {
  return (
    <section className="modal-settings">
      <ModalBgThemeContent activeTab={activeTab} closeToast={closeToast} />
      <ModalUserContent activeTab={activeTab} closeToast={closeToast} navigate={navigate}/>
    </section>
  );
});
