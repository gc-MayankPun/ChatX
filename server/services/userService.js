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

    // Feature: "Add a link which is sent to their email and on clicking that link they will be asked to enter the password and after that they will be authenticated"

    // Create a user from UserModel
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // If creation fails
    if (!newUser) {
      throw new ApiError("User could not be created. Please try again", 500);
    }

    // Return user data
    return {
      username: newUser.username,
      email: newUser.email,
      id: newUser._id,
    };
  } catch (error) {
    // if (error.code === 11000) {
    //   const duplicateField = Object.keys(error.keyPattern)[0];
    //   throw new ApiError(
    //     `An account with this ${duplicateField} already exists.`,
    //     409
    //   );
    // }

    // Default fallback for unexpected errors
    throw new ApiError("Something went wrong during registration.", 500);
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

    // Return user data
    return {
      username: existingUser.username,
      email: existingUser.email,
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
