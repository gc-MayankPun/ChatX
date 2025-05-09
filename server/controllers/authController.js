const { createUser, getUser } = require("../services/userService");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request body
  if (!username || !email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Create new user using the provided data
  const newUser = await createUser(username, email, password);

  // Setting up a token
  const token = jwt.sign(
    { username, email, id: newUser.id },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(201).json({ message: "Successfully registered. You're all set!" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Find user using the provided data
  const user = await getUser(email, password);

  // Setting up a token
  const token = jwt.sign(
    { email, username: user.username, id: user.id },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(200).json({ message: "Login successful. Welcome back!" });
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  // res.redirect("/");
  res.status(200).json({ message: "Logged out successfully, See you soon" });
};

module.exports = { registerUser, loginUser, loginUser, logoutUser };
