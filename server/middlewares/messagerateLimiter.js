const rateLimit = require("express-rate-limit");

const messageRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 1 request per windowMs
  keyGenerator: (req) => req.user.id, // assuming your authMiddleware adds user info to req.user
  message: {
    status: 429,
    error:
      "Too many messages sent. Please wait a minute before sending another message.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = { messageRateLimiter };
