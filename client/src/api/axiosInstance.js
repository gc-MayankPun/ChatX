import axios from "axios";

export const axiosInstance = async ({
  method = "get",
  url,
  payload = null,
  config = {},
}) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      withCredentials: true,
      ...config,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
