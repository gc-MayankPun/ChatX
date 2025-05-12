import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "../utils/yupValidationSchema";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

const useAuthForm = (endpoint) => {
  const navigate = useNavigate();
  const schema = getValidationSchema(endpoint);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { isActionInProgress, setIsActionInProgress } = useContext(ChatContext);
  const { showToast, confirmToast } = useToast();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth${endpoint}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      showToast({ type: "success", payload: data.message });
      navigate("/");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong!";

      if (error?.status === 409) {
        return setError("username", {
          type: "manual",
          message,
        });
      }

      showToast({ type: "error", payload: message });
    },
  });

  const handleLogout = async () => {
    if (isActionInProgress) return; // Prevent action if one is in progress
    setIsActionInProgress(true); // Disable further actions

    try {
      const logoutConfirm = await confirmToast({
        payload: "You will be logout!",
      });
      setIsActionInProgress(false); // Re-enabling the action if the current action is completed
      if (!logoutConfirm) return;

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/logout`,
        {
          method: "post",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        showToast({ type: "success", payload: data.message });
        navigate("/auth/login");
      } else {
        showToast({ type: "error", payload: "Logout failed" });
      }
    } catch (error) {
      console.log(error);
      showToast({ type: "error", payload: "An error occurred during logout" });
    }
  };

  const onSubmit = async (formData) => {
    mutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    handleLogout,
    onSubmit,
    errors,
    isPending: mutation.isPending,
  };
};

export default useAuthForm;
