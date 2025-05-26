const cookie = require("cookie");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (socket, next) => {
  // const rawCookie = socket.handshake.headers.cookie; // cookies from the HTTP upgrade
  const accessToken = socket.handshake.auth.token; // cookies from the HTTP upgrade
  console.log("Access Token:", accessToken);
  
  // if (!rawCookie) return next(new Error("No cookie sent"));

  // const { refreshToken, accessToken } = cookie.parse(rawCookie); // pull the token cookie back out
  // console.log("Access Token:", accessToken);
  // console.log("Refresh Token:", refreshToken);

  if (!accessToken) return next(new Error("Token missing"));

  try {
    // const user = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    socket.user = user; // attach user info to the socket
    next(); // ✅ authenticated
  } catch (err) {
    next(new Error("Invalid / expired token")); // ❌ reject connection
  }
};
