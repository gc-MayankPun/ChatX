const { createUser, getUser } = require("../services/userService");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { uploadToCloudinary } = require("../utils/cloudinaryUtil");
const { deleteTempFile } = require("../utils/multerUtil");
const {
  DEFAULT_AVATAR_URL,
  COOKIE_OPTIONS,
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS,
} = require("../utils/constants");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const { avatar } = req.files;

  let avatarURL;
  if (avatar) {
    avatarURL = await uploadToCloudinary({
      file: avatar[0].path,
      publicId: username,
    });
  } else {
    avatarURL = DEFAULT_AVATAR_URL;
  }

  // Validate request body
  if (!username || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Create new user using the provided data
  const newUser = await createUser(username, password, avatarURL);

  // Setting up a token
  const accessToken = jwt.sign(
    { username, id: newUser.id },
    process.env.JWT_SECRET,
    ACCESS_TOKEN_OPTIONS
  );
  const refreshToken = jwt.sign(
    { username, id: newUser.id },
    process.env.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_OPTIONS
  );
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  await deleteTempFile();

  res.status(201).json({
    message: "Successfully registered. You're all set!",
    user: newUser,
    accessToken,
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Find user using the provided data
  const user = await getUser(username, password);

  // Setting up a token
  const accessToken = jwt.sign(
    { username, id: user.id },
    process.env.JWT_SECRET,
    ACCESS_TOKEN_OPTIONS
  );
  const refreshToken = jwt.sign(
    { username, id: user.id },
    process.env.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_OPTIONS
  );
  res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

  res
    .status(200)
    .json({ message: "Login successful. Welcome back!", user, accessToken });
};

const logoutUser = (req, res) => { 
  res.clearCookie("accessToken", COOKIE_OPTIONS);
  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  res.status(200).json({ message: "Logged out successfully, See you soon" });
};

module.exports = { registerUser, loginUser, loginUser, logoutUser };
