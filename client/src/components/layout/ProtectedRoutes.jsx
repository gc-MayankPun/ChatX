import { SidebarContextProvider } from "../../context/sidebarContext";
import { ScrollContextProvider } from "../../context/scrollContext";
import { RoomContextProvider } from "../../context/chatRoomContext";
import { SocketProvider } from "../../context/socketContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import useToast from "../../hooks/useToast";
import { memo, useEffect } from "react";
import Loader from "../ui/Loader";
import { axiosInstance } from "../../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const ProtectedRoutes = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  // const { token, setToken } = useAuth();

  // useEffect(async () => {
  //   if (!token) {
  //     try {
  //       const data = await axiosInstance({
  //         method: "get",
  //         url: `${import.meta.env.VITE_SERVER_BASE_URL}/refresh-token`,
  //       });
  //       console.log("Setting this token:", data.accessToken);
  //       setToken(data.accessToken);
  //     } catch (error) {
  //       showToast({ type: "error", payload: "Session expired. Please login." });
  //       navigate("/auth/login");
  //     }
  //   }
  // }, [token]);

  // if (!token) return <Loader />;

  

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
