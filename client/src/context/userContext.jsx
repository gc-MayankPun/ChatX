import { createContext, useState } from "react";
import { getItem } from "../utils/localStorage";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // const [user, setUser] = useState({
  //   username: "gc_mayankpun",
  //   avatar:
  //     "https://imgs.search.brave.com/BN-PxGdAhUuBkFHUQYdDLX98Y-pXzKd0ZW_zoiniG-w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvYW5pbWUtcGZw/LXBpY3R1cmVzLXN0/Nnh6YW95MjU2bm8y/aHcuanBn",
  // });
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
