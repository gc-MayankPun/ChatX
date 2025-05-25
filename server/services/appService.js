const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const ApiError = require("../utils/ApiError");

const updateUser = async (username, avatarURL) => {
  // Check if user exists and update
  try {
    const existingUser = await UserModel.findOneAndUpdate(
      { username },
      { avatarURL }
    );

    // If updation fails
    if (!existingUser) {
      throw new ApiError("Failed to upload the image. Please try again", 500);
    }

    // Return user data
    return {
      username: existingUser.username,
      id: existingUser._id,
      avatar: avatarURL,
    };
  } catch (error) {
    throw new ApiError(
      error.message || "Something went wrong while updating profile.",
      error.statusCode || 500
    );
  }
};

module.exports = { updateUser };
