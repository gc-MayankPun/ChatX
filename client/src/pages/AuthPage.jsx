import { LOGO_IMAGE } from "../utils/constants";
import { Outlet } from "react-router-dom";
import "../stylesheets/auth.css";

const AuthPage = () => {
  return (
    <div className="auth-page">
      <div className="logo">
        <div className="logo-container">
          <img src={LOGO_IMAGE} alt="ChatX Logo" />
        </div>
        <h1>ChatX</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthPage;
