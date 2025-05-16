const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { receiveMessage, sendMessage } = require("../controllers/generalChatController");

router.get("/receiveAll", authMiddleware, receiveMessage);
router.post("/send", authMiddleware, sendMessage);

module.exports = router;
