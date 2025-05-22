import useBgThemeHandler from "../../hooks/useBgThemeHandler";
import { useTheme } from "../../context/ThemeContext";
import { isMobile } from "../../utils/responsive";
import { MdOutlineClose } from "react-icons/md";
import { memo, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import "../../stylesheets/modal.css";

const CustomizeModal = ({ closeToast }) => {
  const [activeTab, setActiveTab] = useState("background");

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

const ModalSidebar = memo(({ setActiveTab, activeTab }) => {
  return (
    <aside className="modal-sidebar">
      <ul className="sidebar-nav">
        <li
          className={`sidebar-item ${
            activeTab === "background" ? "active" : ""
          }`}
          onClick={() => setActiveTab("background")}
        >
          Background Image
        </li>
        <li
          className={`sidebar-item ${activeTab === "user" ? "active" : ""}`}
          onClick={() => setActiveTab("user")}
        >
          User
        </li>
      </ul>
    </aside>
  );
});

const ModalContent = memo(({ activeTab, closeToast }) => {
  return (
    <section className="modal-settings">
      <ModalBgThemeContent activeTab={activeTab} closeToast={closeToast} />
      <ModalUserContent activeTab={activeTab} />
    </section>
  );
});

const ModalBgThemeContent = memo(({ activeTab, closeToast }) => {
  const { backgroundThemes, setBackgroundThemes, activeTheme } = useTheme();
  const backgroundRef = useRef(null);
  const { handleImageUpload, handleSelectTheme, handleRemoveTheme } =
    useBgThemeHandler(
      backgroundThemes,
      setBackgroundThemes,
      activeTheme,
      closeToast
    );

  return (
    activeTab === "background" && (
      <div className="background-settings">
        {Object.keys(backgroundThemes).map((theme) => {
          return (
            <div className="container" key={theme}>
              <div
                className="background-option"
                onClick={() => handleSelectTheme(backgroundThemes[theme])}
              >
                <img
                  src={backgroundThemes[theme].link}
                  alt="Background Theme Image"
                  className="background-theme__img"
                />
                {theme !== "default" && (
                  <div
                    style={
                      isMobile() ? { opacity: 1, transform: "scale(1)" } : {}
                    }
                    className="remove-theme__icon center-icon"
                    onClick={(event) => handleRemoveTheme(event, theme)}
                  >
                    <MdOutlineClose />
                  </div>
                )}
                {backgroundThemes[theme].isActive && (
                  <div className="selected-icon center-icon">
                    <FaCheck />
                  </div>
                )}
              </div>
              {theme === "default" && <span>{theme}</span>}
            </div>
          );
        })}
        {Object.keys(backgroundThemes).length < 7 && (
          <div className="container">
            <div
              className="background-option"
              onClick={() => backgroundRef.current.click()}
            >
              <span className="upload-icon center-icon">
                <BsUpload />
              </span>
              <p>Upload from device</p>
              <div className="selected-icon deselected center-icon">
                <FaCheck />
              </div>
            </div>
            <span>Use your own</span>
            <input
              ref={backgroundRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
          </div>
        )}
      </div>
    )
  );
});

const ModalUserContent = memo(({ activeTab }) => {
  return (
    activeTab === "user" && (
      <div className="user-settings">
        <p>User customization is on the way!</p>
        <p>Stay tuned — exciting features will be added soon.</p>
      </div>
    )
  );
});

export default memo(CustomizeModal);
