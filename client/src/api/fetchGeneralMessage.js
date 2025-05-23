import axios from "axios";

const LIMIT = 10;

export const fetchGeneralMessage = async ({ pageParam }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/generalChat/receiveAll`,
      {
        params: { offset: pageParam, limit: LIMIT },
        withCredentials: true,
      }
    );

    const messages = response.data.messages;
    const total = response.data.total; // Total number of messages

    return {
      data: messages,
      currentPage: pageParam,
      nextPage: pageParam + LIMIT < total ? pageParam + LIMIT : null,
      total,
    };
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
};
