const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const ApiError = require("../utils/ApiError");

const createUser = async (username, email, password) => {
  try {
    // Check if user exists
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
      email,
      password: hashedPassword,
    });

    // If creation fails
    if (!newUser) {
      throw new ApiError("User creation failed", 400);
    }
  } catch (error) {
    throw new ApiError(error.message, error.statusCode);
  }
};

const getUser = async (email, password) => {
  try {
    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
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
  } catch (error) {
    throw new ApiError(error.message, error.statusCode);
  }
};

module.exports = { createUser, getUser };
