import { useRef, useState } from "react";
import { applyPseudoBackgroundStyle } from "../../utils/applyPseudoBackgroundStyle";
import { autoCloseSidebarOnMobile, isMobile } from "../../utils/responsive";
import { useUploadBgImage } from "../../hooks/useUploadTheme";
import { useUser } from "../../context/userContext";
import { MdOutlineClose } from "react-icons/md";
import { setItem } from "../../utils/storage";
import useToast from "../../hooks/useToast";
import { BsUpload } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import "../../stylesheets/modal.css";

const CustomizeModal = ({ closeToast }) => {
  const { backgroundThemes, setBackgroundThemes } = useUser();
  const [activeTab, setActiveTab] = useState("background");
  const { uploadImage } = useUploadBgImage();
  const backgroundRef = useRef(null);
  const { showToast } = useToast();
  
  const handleImageUpload = (e) => {
    if (Object.keys(backgroundThemes).length > 7) {
      showToast({
        type: "info",
        payload: "Heads up! You can only save 7 background themes for now.",
        config: { position: "bottom-right" },
      });
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    uploadImage(".chat-room__messages-wrapper", file);
    autoCloseSidebarOnMobile();
    closeToast();
  };

  const handleSelectTheme = (selectedTheme) => {
    const updatedThemes = Object.fromEntries(
      Object.entries(backgroundThemes).map(([key, value]) => [
        key,
        {
          ...value,
          isActive: value.link === selectedTheme.link,
        },
      ])
    );

    setItem("backgroundThemes", updatedThemes);
    setBackgroundThemes(updatedThemes);

    applyPseudoBackgroundStyle(
      ".chat-room__messages-wrapper",
      selectedTheme.link
    );

    autoCloseSidebarOnMobile();
    closeToast();
  };

  const handleRemoveTheme = (event, selectedTheme) => {
    event.stopPropagation();

    const updatedThemes = { ...backgroundThemes };
    const isCurrentlyActive = updatedThemes[selectedTheme]?.isActive;

    delete updatedThemes[selectedTheme];

    // If the theme is same as the selected one, then change to default
    if (isCurrentlyActive) {
      const remainingKeys = Object.keys(updatedThemes);

      if (remainingKeys.length > 0) {
        const randomKey =
          remainingKeys[Math.floor(Math.random() * remainingKeys.length)];

        updatedThemes[randomKey].isActive = true;

        applyPseudoBackgroundStyle(
          ".chat-room__messages-wrapper",
          updatedThemes[randomKey].link
        );
      }
    }

    setItem("backgroundThemes", updatedThemes);
    setBackgroundThemes(updatedThemes);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Customize Your Theme</h2>
        <div className="modal-content">
          <div className="modal-layout">
            {/* Sidebar Navigation */}
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
                  className={`sidebar-item ${
                    activeTab === "user" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("user")}
                >
                  User
                </li>
              </ul>
            </aside>

            {/* Content Area */}
            <section className="modal-settings">
              {activeTab === "background" && (
                <div className="background-settings">
                  {Object.keys(backgroundThemes).map((theme) => {
                    return (
                      <div className="container" key={theme}>
                        <div
                          className="background-option"
                          onClick={() =>
                            handleSelectTheme(backgroundThemes[theme])
                          }
                        >
                          <img
                            src={backgroundThemes[theme].link}
                            alt="Background Theme Image"
                            className="background-theme__img"
                          />
                          {theme !== "default" && (
                            <div
                              style={
                                isMobile()
                                  ? { opacity: 1, transform: "scale(1)" }
                                  : {}
                              }
                              className="remove-theme__icon center-icon"
                              onClick={(event) =>
                                handleRemoveTheme(event, theme)
                              }
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
              )}

              {activeTab === "user" && (
                <div className="user-settings">
                  <p>User customization is on the way!</p>
                  <p>Stay tuned — exciting features will be added soon.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
