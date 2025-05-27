import { axiosInstance } from "./axiosInstance";

export const validateToken = async () => {
  try {
    const data = await axiosInstance({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/`,
    });
    return data;
  } catch (err) {
    const message = err?.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
