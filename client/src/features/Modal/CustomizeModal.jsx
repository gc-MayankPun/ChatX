import { ModalContent } from "./components/ModalContent/ModalContent";
import { ModalSidebar } from "./components/ModalSidebar";
import { memo, useState } from "react";
import "./styles/modal.css";

const CustomizeModal = ({ closeToast }) => {
  const [activeTab, setActiveTab] = useState("background");
  console.log("Rendering Modal...")

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Customize Your Theme</h2>
        <div className="modal-content">
          <div className="modal-layout">
            {/* Sidebar Navigation */}
            <ModalSidebar setActiveTab={setActiveTab} activeTab={activeTab} />

            {/* Content Area */}
            <ModalContent activeTab={activeTab} closeToast={closeToast} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomizeModal);
