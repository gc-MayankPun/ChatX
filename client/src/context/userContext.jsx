import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentChatRoom, setCurrentChatRoom] = useState(null);

  const getClickedChat = (event) => {
    setCurrentChatRoom(event.target.textContent);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, currentChatRoom, getClickedChat }}
    >
      {children}
    </UserContext.Provider>
  );
};
