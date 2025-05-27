const {
  createMessage,
  getAllGeneralMessages,
} = require("../services/generalChatService");
const ApiError = require("../utils/ApiError");
require("dotenv").config();

const sendMessage = async (req, res) => {
  const { message } = req.body;

  const generalChat = await createMessage(message, req.user.id);

  res.status(201).json({ message: "sended", generalChat });
};

const receiveMessage = async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const { messages, total } = await getAllGeneralMessages(offset, limit);
    res.status(200).json({ messages, total });
  } catch (err) {
    throw new ApiError(
      err.message || "Failed to fetch general messages.",
      err.statusCode || 500
    );
  }
};

module.exports = { receiveMessage, sendMessage };
