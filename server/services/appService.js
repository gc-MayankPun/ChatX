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

const deleteUserData = async (userID) => {
  // Check if user exists and delete
  try {
    const existingUser = await UserModel.findOneAndDelete({ _id: userID });

    // If deletion fails
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return deleted user data
    return existingUser.username;
  } catch (error) {
    throw new ApiError(
      error.message || "Something went wrong while deleting your account.",
      error.statusCode || 500
    );
  }
};

module.exports = { updateUser, deleteUserData };
