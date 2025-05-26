import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { applyPseudoBackgroundStyle } from "../utils/applyPseudoBackgroundStyle";
import { DEFAULT_BACKGROUND_IMAGE } from "../utils/constants";
import { getItem } from "../utils/storage";

const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
  const [backgroundThemes, setBackgroundThemes] = useState(
    getItem("backgroundThemes") || {
      default: {
        link: DEFAULT_BACKGROUND_IMAGE,
        isActive: true,
      },
    }
  );

  useEffect(() => {
    if (activeTheme) {
      applyPseudoBackgroundStyle(
        ".chat-room__messages-wrapper",
        activeTheme.link
      );
    }
  }, []);

  const activeTheme = useMemo(() => {
    return Object.values(backgroundThemes).find((t) => t.isActive);
  }, [backgroundThemes]);

  const value = useMemo(
    () => ({
      backgroundThemes,
      setBackgroundThemes,
      activeTheme,
    }),
    [backgroundThemes]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
