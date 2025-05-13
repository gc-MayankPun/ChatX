// middlewares/socketAuth.js
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  const rawCookie = socket.handshake.headers.cookie; // cookies from the HTTP upgrade
  if (!rawCookie) return next(new Error("No cookie sent"));

  const { token } = cookie.parse(rawCookie); // pull the token cookie back out
  if (!token) return next(new Error("Token missing"));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user; // attach user info to the socket
    next(); // ✅ authenticated
  } catch (err) {
    next(new Error("Invalid / expired token")); // ❌ reject connection
  }
};
