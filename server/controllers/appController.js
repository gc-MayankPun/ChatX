const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  deleteFromCloudinary,
  uploadToCloudinary,
} = require("../utils/cloudinaryUtil");
const { deleteTempFile } = require("../utils/multerUtil");
const { updateUser, deleteUserData } = require("../services/appService");
const { ACCESS_TOKEN_OPTIONS } = require("../utils/constants");

const updateAvatar = async (req, res) => {
  const { username } = req.body;
  const { avatar } = req.files;

  // Validate request body
  if (!username || !avatar) {
    throw new ApiError("Invalid details", 400);
  }

  const avatarURL = await uploadToCloudinary({
    file: avatar[0].path,
    publicId: username,
  });

  // Update user using the provided data
  const updatedUser = await updateUser(username, avatarURL);

  await deleteTempFile();

  res
    .status(201)
    .json({ message: "Uploaded Image!", avatar: updatedUser.avatar });
};

const deleteUser = async (req, res) => {
  const { userID, username } = req.body;

  // Validate request body
  if (!userID || !username) {
    throw new ApiError("Invalid ID", 400);
  }

  // Delete the user's avatar
  await deleteFromCloudinary(`ChatX/avatars/${username}`);

  // Delete user using the provided data
  const deletedUser = await deleteUserData(userID);

  res.clearCookie();
  res.status(200).json({
    message: "Your account has been successfully deleted.",
    user: deletedUser,
  });
};

const validateRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // issue new access token
    const accessToken = jwt.sign(
      { username: payload.username, id: payload.id },
      process.env.JWT_SECRET,
      ACCESS_TOKEN_OPTIONS
    );

    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = { updateAvatar, deleteUser, validateRefreshToken };
