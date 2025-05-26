const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  try {
    // Verify token and attach decoded user to request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
