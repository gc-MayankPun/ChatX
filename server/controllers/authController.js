const { createUser, getUser } = require("../services/userService");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate request body
  if (!username || !email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Create new user using the provided data
  await createUser(username, email, password);

  // Setting up a token
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  // res.cookie("token", "Boku_wa_token");
  res.cookie("token", token);

  // Sending success message and redirect URL in JSON response
//   res.status(201).json({ message: "Registered successfully", redirectTo: "/" });
  //   res.redirect("/");
  res.redirect("/")
};

const loginUserDetails = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Find user using the provided data
  await getUser(email, password);

  // Setting up a token
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  res.cookie("token", token);

  // Sending success message and redirect URL in JSON response
//   res.status(200).json({ message: "Logged in successfully", redirectTo: "/" });
    // res.redirect("/login");
    res.redirect("/")
};

const loginUser = (req, res) => {
    res.send("Login")
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports = { registerUser, loginUserDetails, loginUser, logoutUser };
