const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const uploadToCloudinary = require("../utils/cloudinaryUtil");
const { deleteTempFile } = require("../utils/multerUtil");
const { updateUser } = require("../services/appService");

const updateAvatar = async (req, res) => {
  const { username } = req.body;
  const { avatar } = req.files;

  // Validate request body
  if (!username || !avatar) {
    throw new ApiError("All fields are required", 400);
  }

  const avatarURL = await uploadToCloudinary({
    file: avatar[0].path,
    publicId: `avatar/${username}`,
  });

  // Update user using the provided data
  const updatedUser = await updateUser(username, avatarURL);

  await deleteTempFile();

  res
    .status(201)
    .json({ message: "Uploaded Image!", avatar: updatedUser.avatar });
};

module.exports = { updateAvatar };
