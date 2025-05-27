import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UserContextProvider } from "./context/userContext";
import { Bounce, ToastContainer } from "react-toastify";
import AppWrapper from "./components/layout/AppWrapper";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { AuthContextProvider } from "./context/authContext";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <UserContextProvider>
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
          </UserContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
