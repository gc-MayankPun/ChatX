export const validateToken = async (token) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) return console.log("Invalid token");
    return response.json();
  } catch (error) {
    console.log("Token validation failed:", error);
    return "something"
  }
};
