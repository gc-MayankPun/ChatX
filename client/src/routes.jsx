import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import ForgotPasswordForm from "./pages/auth/ForgotPasswordForm";
import { createBrowserRouter } from "react-router-dom";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import RegisterForm from "./pages/auth/RegisterForm";
import LoginForm from "./pages/auth/LoginForm";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: <Error />,
    children: [
      {
        index: true, // default is login
        element: <LoginForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "password/reset",
        element: <ForgotPasswordForm />,
      },
    ],
  },
  {
    path: "/legal/:info",
    element: <TermsAndPrivacy />,
    errorElement: <Error />,
  },
]);

export default router;
