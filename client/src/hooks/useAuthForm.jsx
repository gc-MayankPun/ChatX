import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { getValidationSchema } from "../utils/yupValidationSchema";
import { showToast } from "../utils/showToast";
import { useNavigate } from "react-router-dom";

const useAuthForm = (endpoint) => {
  const navigate = useNavigate();
  const schema = getValidationSchema(endpoint);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}${endpoint}`,
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
      showToast("success", data.message);
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

      showToast("error", message);
    },
  });

  const onSubmit = async (formData) => {
    mutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isPending: mutation.isPending,
  };
};

export default useAuthForm;
