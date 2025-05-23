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

    // Enforce max 5000 messages limit
    const totalCount = await GeneralChatModel.countDocuments();
    const MAX_MESSAGES = 5000;

    if (totalCount > MAX_MESSAGES) {
      // Number of messages to remove
      const excessCount = totalCount - MAX_MESSAGES;

      // Find IDs of oldest messages
      const oldestMessages = await GeneralChatModel.find({})
        .sort({ createdAt: 1 }) // oldest first
        .limit(excessCount)
        .select("_id");

      const idsToDelete = oldestMessages.map((msg) => msg._id);

      // Delete them by IDs
      await GeneralChatModel.deleteMany({ _id: { $in: idsToDelete } });
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

const getAllGeneralMessages = async (offset, limit) => {
  try {
    const total = await GeneralChatModel.countDocuments();
    const messages = await GeneralChatModel.find({})
      // .sort({ createdAt: 1 }) // sort oldest to newest
      .sort({ createdAt: -1 }) // newest first
      .skip(offset) // skip first 'offset' messages
      .limit(limit) // return only 'limit' messages
      .populate("sender", "username avatarURL _id");

    return { total, messages: messages.reverse() };
  } catch (error) {
    throw new ApiError(
      error.message || "Failed to fetch general messages.",
      error.statusCode || 500
    );
  }
};

module.exports = { createMessage, getAllGeneralMessages };
