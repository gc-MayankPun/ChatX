import { FETCH_PAGE_LIMIT } from "../utils/constants";
import { axiosInstance } from "./axiosInstance";

export const fetchGeneralMessage = async ({ pageParam }) => {
  try {
    const data = await axiosInstance({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/receiveAll`,
      config: {
        params: { offset: pageParam, limit: FETCH_PAGE_LIMIT },
      },
    });

    const messages = data.messages;
    const total = data.total; // Total number of messages

    return {
      data: messages,
      currentPage: pageParam,
      nextPage:
        pageParam + FETCH_PAGE_LIMIT < total
          ? pageParam + FETCH_PAGE_LIMIT
          : null,
    };
  } catch (error) {
    throw error;
  }
};
