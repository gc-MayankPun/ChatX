const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  receiveMessage,
  sendMessage,
} = require("../controllers/generalChatController");
const { messageRateLimiter } = require("../middlewares/messagerateLimiter");

router.get("/receiveAll", authMiddleware, receiveMessage);
router.post("/send", authMiddleware, messageRateLimiter, sendMessage);

module.exports = router;
