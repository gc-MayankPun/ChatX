import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../ui/Loader";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ProtectedRoutes = () => {
  const { setUser } = useContext(UserContext);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/`,
          {
            withCredentials: true,
          }
        );
        // console.log(response);
        setUser({ ...response.data.user });

        setChecking(false);
      } catch (err) {
        navigate("/auth/login");
      }
    };

    // verifyAuth();
  }, [navigate]);

  // if (checking) return <Loader />;

  return <Outlet />;
};

export default ProtectedRoutes;
