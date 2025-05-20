import { useCallback } from "react";
import { applyPseudoBackgroundStyle } from "../utils/applyPseudoBackgroundStyle";
import { generateRandomID } from "../utils/generateRandomID";
import { resizeImage } from "../utils/imageResolutionUtil";
import { useUser } from "../context/userContext";
import { setItem } from "../utils/storage";

export const useUploadBgImage = () => {
  const { backgroundThemes, setBackgroundThemes } = useUser();

  const uploadImage = useCallback(async (selector, input) => {
    resizeImage(input, 1920, 1080, (base64Image) => {
      const themeID = generateRandomID();
      const updateThemes = {
        ...Object.entries(backgroundThemes).reduce((acc, [key, value]) => {
          acc[key] = {
            ...value,
            isActive: key === themeID,
          };
          return acc;
        }, {}),
        [themeID]: {
          link: base64Image,
          isActive: true,
        },
      };
      setItem("backgroundThemes", updateThemes);
      setBackgroundThemes(updateThemes);

      applyPseudoBackgroundStyle(selector, base64Image);
    });
  }, []);

  return { uploadImage };
};
