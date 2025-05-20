import { UserContextProvider } from "../context/userContext";
import { SocketProvider } from "../context/socketContext";
import { RoomContextProvider } from "../context/chatRoomContext";
import { SidebarContextProvider } from "../context/sidebarContext";
import HomePage from "./HomePage";

const HomeProvider = () => {
  return (
    <UserContextProvider>
      <SocketProvider>
        <RoomContextProvider>
          <SidebarContextProvider>
            <HomePage />
          </SidebarContextProvider>
        </RoomContextProvider>
      </SocketProvider>
    </UserContextProvider>
  );
};

export default HomeProvider;
