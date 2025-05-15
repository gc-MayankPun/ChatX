import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../ui/Loader";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { setItem } from "../../utils/localStorage";
import useToast from "../../hooks/useToast";

const ProtectedRoutes = () => {
  const { setUser } = useContext(UserContext);
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
        // setUser({ ...response.data.user });
        setUser({ ...response.data.user, avatar: "/images/blank-user.webp" });
        setItem("user", {
          ...response.data.user,
          avatar: "/images/blank-user.webp",
        });

        setChecking(false);
      } catch (err) {
        const message = err?.response?.data?.message || "Something went wrong!";
        showToast({type: "error", payload: message})
        navigate("/auth/login");
      }
    };
    verifyAuth();
  }, [navigate]);

  if (checking) return <Loader />;

  return <Outlet />;
};

export default ProtectedRoutes;
