import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import ForgotPasswordForm from "./pages/auth/ForgotPasswordForm";
import LoginForm from "./pages/auth/LoginForm";
import RegisterForm from "./pages/auth/RegisterForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
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
    path: "/auth/password/reset",
    element: <ForgotPasswordForm />,
  },
]);

export default router;
