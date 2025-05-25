import { axiosInstance } from "./axiosInstance";

export const uploadImageToServer = async (formData) => {
  try {
    const data = await axiosInstance({
      method: "post",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/uploadImage`,
      payload: formData,
    });
    return data;
  } catch (err) {
    const message = err?.response?.data?.message || "Something went wrong!";
    throw new Error(message);
  }
};
