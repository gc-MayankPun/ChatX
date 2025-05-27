import { SidebarContextProvider } from "../../context/sidebarContext";
import { ScrollContextProvider } from "../../context/scrollContext";
import { RoomContextProvider } from "../../context/chatRoomContext";
import { SocketProvider } from "../../context/socketContext";
import { Outlet } from "react-router-dom";
import { memo } from "react";
import Loader from "../ui/Loader";

const ProtectedRoutes = () => {
  return (
    <ScrollContextProvider>
      <SocketProvider>
        <RoomContextProvider>
          <SidebarContextProvider>
            <Outlet />
          </SidebarContextProvider>
        </RoomContextProvider>
      </SocketProvider>
    </ScrollContextProvider>
  );
};

export default memo(ProtectedRoutes);
