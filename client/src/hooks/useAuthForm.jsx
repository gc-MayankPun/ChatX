import { getValidationSchema } from "../utils/yupValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { getItem, setItem } from "../utils/storage";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useToast from "./useToast";
import axios from "axios";

const useAuthForm = ({ endpoint, imageSet}) => {
  const schema = getValidationSchema(endpoint);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { showToast, confirmToast } = useToast();
  const { setUser } = useUser();
  const navigate = useNavigate();

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

      const redirectURL = getItem("redirectAfterAuth") || "/";
      localStorage.removeItem("redirectAfterAuth");

      // Use full browser redirect if it's an absolute URL
      if (redirectURL.startsWith("http")) {
        window.location.href = redirectURL;
      } else {
        navigate(redirectURL);
      }
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
    try {
      const logoutConfirm = await confirmToast({
        payload: "You will be logout!",
      });
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
      showToast({ type: "error", payload: "An error occurred during logout" });
    }
  };

  const onSubmit = async (formData) => {
    const form = new FormData();
    const { username, password } = formData;

    if (imageSet !== "default") {
      form.append("avatar", imageSet);
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
