const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { updateAvatar } = require("../controllers/appController");
const { upload } = require("../utils/multerUtil");

router.get("/", authMiddleware, upload.none(), (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

router.post(
  "/uploadImage",
  authMiddleware,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateAvatar
);

module.exports = router;
