import { axiosInstance } from "./axiosInstance";

export const deleteUser = async (userID, username) => {
  try {
    const data = await axiosInstance({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/deleteUser`,
      payload: { userID, username },
    });
    return data;
  } catch (err) {
    const message = err?.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
