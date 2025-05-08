import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/`, {
          withCredentials: true, // sends the cookie
        });
        setChecking(false); // Authenticated
      } catch (err) {
        navigate("/auth/login"); // Not authenticated
      }
    };

    verifyAuth();
  }, [navigate]);

  // Optional: show loading until check completes
  // if (checking) return <div>Checking auth...</div>;

  return <Outlet />;
};

export default ProtectedRoutes;
