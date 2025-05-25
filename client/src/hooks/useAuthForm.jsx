import { getValidationSchema } from "../utils/yupValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { getItem, setItem } from "../utils/storage";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useToast from "./useToast";

const useAuthForm = ({ endpoint, imageSet }) => {
  const schema = getValidationSchema(endpoint);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { showToast, confirmToast } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const data = await axiosInstance({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_BASE_URL}/auth${endpoint}`,
        payload: formData,
      });
      return data;
    },
    onSuccess: (data) => {
      showToast({ type: "success", payload: data.message });
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
      console.log(error)
      const message = error?.response?.data?.message || "Something went wrong!";

      if (error?.status === 409) {
        return setError("username", {
          type: "manual",
          message,
        });
      }

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

      const data = await axiosInstance({
        method: "post",
        url: `${import.meta.env.VITE_SERVER_BASE_URL}/auth/logout`,
      });

      if (data) {
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
