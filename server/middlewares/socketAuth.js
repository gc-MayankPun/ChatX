const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (socket, next) => {
  const accessToken = socket.handshake.auth.token; 

  if (!accessToken) return next(new Error("Token missing"));

  try {
    const user = jwt.verify(accessToken, process.env.JWT_SECRET);
    socket.user = user; // attach user info to the socket
    next(); // ✅ authenticated
  } catch (err) {
    next(new Error("Invalid / expired token")); // ❌ reject connection
  }
};
