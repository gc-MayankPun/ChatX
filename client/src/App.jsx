import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarContextProvider } from "./context/sidebarContext";
import { RoomContextProvider } from "./context/chatRoomContext";
import { UserContextProvider } from "./context/userContext";
import { SocketProvider } from "./context/socketContext";
import { Bounce, ToastContainer } from "react-toastify";
import AppWrapper from "./components/layout/AppWrapper";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SocketProvider>
          <RoomContextProvider>
            <SidebarContextProvider>
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
            </SidebarContextProvider>
          </RoomContextProvider>
        </SocketProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
};

export default App;
