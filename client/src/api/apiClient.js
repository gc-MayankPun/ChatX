import axios from "axios";

export const validateToken = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    const message = err?.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
