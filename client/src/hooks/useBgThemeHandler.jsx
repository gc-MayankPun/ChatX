import { applyPseudoBackgroundStyle } from "../utils/applyPseudoBackgroundStyle";
import { useUploadBgImage } from "./useUploadTheme";
import { setItem } from "../utils/storage";
import useToast from "./useToast";

const useBgThemeHandler = (
  backgroundThemes,
  setBackgroundThemes,
  activeTheme,
  closeToast
) => {
  const { uploadImage } = useUploadBgImage();
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
    closeToast();
  };

  const handleSelectTheme = (selectedTheme) => {
    // If the theme is already selected then don't select it again
    if (activeTheme.link === selectedTheme.link) {
      return;
    }

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

  return { handleImageUpload, handleSelectTheme, handleRemoveTheme };
};

export default useBgThemeHandler;
