import { createContext, useContext, useEffect, useState } from "react";
import { applyPseudoBackgroundStyle } from "../utils/applyPseudoBackgroundStyle";
import { getItem } from "../utils/storage";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(getItem("user") || null);
  const [backgroundThemes, setBackgroundThemes] = useState(
    getItem("backgroundThemes") || {
      default: {
        link: "https://res.cloudinary.com/dozdj2yha/image/upload/v1747680988/default-background_z9gnbf.png",
        isActive: true,
      },
    }
  );

  useEffect(() => {
    Object.keys(backgroundThemes).map((theme) => {
      if (backgroundThemes[theme].isActive) {
        applyPseudoBackgroundStyle(
          ".chat-room__messages-wrapper",
          backgroundThemes[theme].link
        );
      }
    });
  }, [backgroundThemes]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        backgroundThemes,
        setBackgroundThemes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
