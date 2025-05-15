const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const ApiError = require("../utils/ApiError");

const createUser = async (username, password, avatarURL) => {
  // Check if user exists
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new ApiError(
        "Username already exists. Please choose a different one.",
        409
      );
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user from UserModel
    const newUser = await UserModel.create({
      username,
      password: hashedPassword,
      avatarURL,
    });

    // If creation fails
    if (!newUser) {
      throw new ApiError("Registration failed. Please try again", 500);
    }

    // Return user data
    return {
      username: newUser.username,
      id: newUser._id,
      avatar: avatarURL,
    };
  } catch (error) {
    throw new ApiError(
      error.message || "Something went wrong during registration.",
      error.statusCode || 500
    );
  }
};

const getUser = async (username, password) => {
  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      throw new ApiError("Invalid credentials", 401);
    }

    // Check password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    // Return user data
    return {
      username: existingUser.username,
      avatar: existingUser.avatarURL,
      id: existingUser._id,
    };
  } catch (error) {
    throw new ApiError(
      error.message || "Login failed",
      error.statusCode || 500
    );
  }
};

module.exports = { createUser, getUser };
