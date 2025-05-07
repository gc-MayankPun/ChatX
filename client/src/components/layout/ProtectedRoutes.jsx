import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../../api/apiClient";

const ProtectedRoutes = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const {data, isPending, isError, error } = useQuery({
    queryKey: ["validateToken"],
    queryFn: () => validateToken(cookies.token),
    retry: false, // Don't retry on failure
    enabled: !!cookies.token, // Only run if token exists
  });
  console.log("Cookies Token Data", cookies.token)

  useEffect(() => {
    if (!cookies.token) {
      navigate("/auth/login"); // No token → redirect
    } else if (isError) {
      navigate("/auth/login"); // Invalid token → redirect
    }
  }, [cookies.token, isError, navigate]);

  // Only render outlet if authenticated
  return cookies.token ? <Outlet /> : null;
};

export default ProtectedRoutes;
