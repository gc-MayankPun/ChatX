import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarContextProvider } from "./context/sidebarContext";
import { RoomContextProvider } from "./context/chatRoomContext";
import { UserContextProvider } from "./context/userContext";
import { SocketProvider } from "./context/socketContext";
import { Bounce, ToastContainer } from "react-toastify";
import AppWrapper from "./components/layout/AppWrapper";
import { Auth0Provider } from "@auth0/auth0-react";
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import router from "./routes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Auth0Provider
      domain={`${import.meta.env.VITE_0AUTH_DOMAIN}`}
      clientId={`${import.meta.env.VITE_0AUTH_CLIENT_ID}`}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <SocketProvider>
            <RoomContextProvider>
              <SidebarContextProvider>
                <CookiesProvider>
                  <AppWrapper>
                    <RouterProvider router={router} />
                  </AppWrapper>
                  <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    // limit={1}
                    transition={Bounce}
                  />
                </CookiesProvider>
              </SidebarContextProvider>
            </RoomContextProvider>
          </SocketProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
