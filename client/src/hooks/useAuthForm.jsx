import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "../utils/yupValidationSchema";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { UserContext } from "../context/userContext";
import { setItem } from "../utils/localStorage";

const useAuthForm = ({ endpoint, imageSet = "default" }) => {
  const { setUser } = useContext(UserContext);
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
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      showToast({ type: "success", payload: data.message });
      setUser(data.user);
      setItem("user", data.user);
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

      setUser(null);
      setItem("user", null);
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

        localStorage.removeItem("currentChatRoom");
        localStorage.removeItem("user");
        sessionStorage.removeItem("chatRooms");

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
    const form = new FormData();
    const { username, password } = formData;

    if (imageSet !== "default") {
      form.append("avatar", imageSet["original"].file);
    }

    form.append("username", username);
    form.append("password", password);

    mutation.mutate(form);
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
