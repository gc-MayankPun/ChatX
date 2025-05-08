import React, { useEffect, useState } from "react";
import "../stylesheets/auth.css";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/`, {
          withCredentials: true, // ✅ include cookie
        });
        // ✅ If authenticated, redirect to home
        navigate("/");
      } catch (err) {
        // ❌ Not authenticated → stay on auth page (no redirect)
        setChecking(false);
      }
    };

    verifyAuth();
  }, [navigate]); // ✅ Add dependency

  if (checking) return null; // Optional: add a spinner or splash screen

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
 