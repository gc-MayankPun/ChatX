import React from "react";
import { RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import router from "./routes";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/UserContext";

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
          <CookiesProvider>
            <RouterProvider router={router} />
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
              transition={Bounce}
            />
          </CookiesProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
