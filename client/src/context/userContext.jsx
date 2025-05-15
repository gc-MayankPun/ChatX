import { createContext, useState } from "react";
import { getItem } from "../utils/localStorage";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
const [user, setUser] = useState(getItem("user") || null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
