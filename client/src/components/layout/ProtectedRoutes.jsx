import { SidebarContextProvider } from "../../context/sidebarContext";
import { RoomContextProvider } from "../../context/chatRoomContext";
import { UserContextProvider } from "../../context/userContext";
import { SocketProvider } from "../../context/socketContext";
import { Outlet, useNavigate } from "react-router-dom";
import { validateToken } from "../../api/apiClient";
import { setItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import Loader from "../ui/Loader";
import { ScrollContextProvider } from "../../context/scrollContext";

const ProtectedRoutes = () => {
  const [checking, setChecking] = useState(true);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await validateToken();
        setChecking(false);
      } catch (error) {
        showToast({ type: "error", payload: error.message });
        const currentUrl = window.location.href;
        setItem("redirectAfterAuth", currentUrl);
        navigate("/auth/login");
      }
    };
    verifyAuth();
  }, [navigate]);

  if (checking) return <Loader />;

  return (
    <UserContextProvider>
      <ScrollContextProvider>
        <SocketProvider>
          <RoomContextProvider>
            <SidebarContextProvider>
              <Outlet />
            </SidebarContextProvider>
          </RoomContextProvider>
        </SocketProvider>
      </ScrollContextProvider>
    </UserContextProvider>
  );
};

export default ProtectedRoutes;
