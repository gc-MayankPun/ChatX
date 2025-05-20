import { Outlet, useNavigate } from "react-router-dom";
import { setItem } from "../../utils/storage";
import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import Loader from "../ui/Loader";
import axios from "axios";

const ProtectedRoutes = () => {
  const [checking, setChecking] = useState(true);
  const { showToast } = useToast();
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

        setChecking(false);
      } catch (err) {
        const message = err?.response?.data?.message || "Something went wrong!";
        showToast({ type: "error", payload: message });
        const currentUrl = window.location.href;
        setItem("redirectAfterAuth", currentUrl);
        navigate("/auth/login");
      }
    };
    verifyAuth();
  }, [navigate]);

  if (checking) return <Loader />;

  return <Outlet />;
};

export default ProtectedRoutes;
