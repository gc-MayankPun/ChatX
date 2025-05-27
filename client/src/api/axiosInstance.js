import axios from "axios";

export const axiosInstance = async ({
  method = "get",
  url,
  payload = null,
  headers = {},
  config = {},
}) => {
  try {
    const response = await axios({
      method,
      url,
      data: payload,
      withCredentials: true,
      headers,
      ...config,
    });

    return response.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
};
