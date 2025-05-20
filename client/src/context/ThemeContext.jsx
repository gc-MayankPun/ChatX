import { createContext, useContext, useMemo, useState } from "react";
import { getItem } from "../utils/storage";

const ThemeContext = createContext(null);

export const ThemeContextProvider = ({ children }) => {
  const [backgroundThemes, setBackgroundThemes] = useState(
    getItem("backgroundThemes") || {
      default: {
        link: "https://res.cloudinary.com/dozdj2yha/image/upload/v1747680988/default-background_z9gnbf.png",
        isActive: true,
      },
    }
  );

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
