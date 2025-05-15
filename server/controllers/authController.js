const { createUser, getUser } = require("../services/userService");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uploadToCloudinary = require("../utils/cloudinaryUtil");
const { deleteTempFile } = require("../utils/multerUtil");

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const { avatar } = req.files;

  let avatarURL;
  if (avatar) {
    avatarURL = await uploadToCloudinary({
      file: avatar[0].path,
      publicId: `avatar/${username}`,
    });
  } else {
    avatarURL =
      "https://res.cloudinary.com/dozdj2yha/image/upload/f_auto,q_auto/v1747328460/blank-profile-picture-973460_1280_ybew2z.png";
  }

  // Validate request body
  if (!username || !password) {
    throw new ApiError("All fields are required", 400);
  }

  // Create new user using the provided data
  const newUser = await createUser(username, password, avatarURL);

  // Setting up a token
  const token = jwt.sign({ username, id: newUser.id }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    // domain: ".inc1.devtunnels.ms",
  });

  await deleteTempFile();

  res.status(201).json({
    message: "Successfully registered. You're all set!",
    user: newUser,
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
  const token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    // domain: ".inc1.devtunnels.ms",
  });

  res.status(200).json({ message: "Login successful. Welcome back!", user });
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ message: "Logged out successfully, See you soon" });
};

module.exports = { registerUser, loginUser, loginUser, logoutUser };
