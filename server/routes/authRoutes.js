const express = require("express");
const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();
const { upload } = require("../utils/multerUtil");

router.post("/login", upload.none(), loginUser);
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
);
router.post("/logout", logoutUser);

module.exports = router;
