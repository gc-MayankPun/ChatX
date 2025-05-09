import React from "react";
import { showToast } from "../utils/showToast";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/logout`,
        {
          method: "post",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        showToast("success", data.message);
        navigate("/auth/login");
      } else {
        showToast("error", "Logout failed");
      }
    } catch (error) {
      showToast("error", "An error occurred during logout");
    }
  };

  return (
    <>
      <h1>Hello, Welcome to the Home Page!</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default HomePage;
