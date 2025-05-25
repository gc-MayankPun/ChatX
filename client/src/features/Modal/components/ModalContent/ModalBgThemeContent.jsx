import useBgThemeHandler from "../../../../hooks/useBgThemeHandler";
import { useTheme } from "../../../../context/ThemeContext";
import { isMobile } from "../../../../utils/responsive";
import { MdOutlineClose } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { memo, useRef } from "react";

export const ModalBgThemeContent = memo(({ activeTab, closeToast }) => {
  const backgroundRef = useRef(null);
  const { backgroundThemes, setBackgroundThemes, activeTheme } = useTheme();
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
