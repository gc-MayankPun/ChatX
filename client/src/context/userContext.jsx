import { createContext, useState } from "react";
import useSidebarToggler from "../hooks/useSidebarToggler";
import gsap from "gsap";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [currentChatRoom, setCurrentChatRoom] = useState(null);
  const { closeSidebar } = useSidebarToggler();

  const getClickedChat = (event) => {
    setCurrentChatRoom(event.target.textContent);
    closeSidebar();
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, currentChatRoom, getClickedChat }}
    >
      {children}
    </UserContext.Provider>
  );
};
