const express = require("express");
const { loginUser, loginUserDetails, registerUser, logoutUser } = require("../controllers/authController");
const router = express.Router();

router.get("/login", loginUser);
router.post("/login", loginUserDetails);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

module.exports = router;
