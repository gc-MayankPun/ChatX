import { Outlet } from "react-router-dom";
import "../stylesheets/auth.css";

const AuthPage = () => {
   console.log("Rendering Auth Page...")
   
  return (
    <div className="auth-page">
      <div className="logo">
        <div className="logo-container">
          <img src="/images/chat.webp" alt="ChatX Logo" />
        </div>
        <h1>ChatX</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthPage;
