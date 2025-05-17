const GeneralChatModel = require("../models/generalChatModel");
const ApiError = require("../utils/ApiError");

const createMessage = async (message, senderID) => {
  try {
    // Create a mesage from GeneralChatModel
    const newMessage = await GeneralChatModel.create({
      message,
      sender: senderID,
    });

    // If creation fails
    if (!newMessage) {
      throw new ApiError("Failed to send message.", 500);
    }

    const createdMessage = await GeneralChatModel.findById(
      newMessage._id
    ).populate("sender", "username avatarURL _id");

    return {
      newMessage: createdMessage,
    };
  } catch (error) {
    throw new ApiError(
      error.message || "Failed to send message.",
      error.statusCode || 500
    );
  }
};

const getAllGeneralMessages = async () => {
  try {
    const messages = await GeneralChatModel.find({})
      .sort({ createdAt: 1 }) // sort oldest to newest
      .populate("sender", "username avatarURL _id");

    return messages;
  } catch (error) {
    throw new ApiError(
      error.message || "Failed to fetch general messages.",
      error.statusCode || 500
    );
  }
};

module.exports = { createMessage, getAllGeneralMessages };
