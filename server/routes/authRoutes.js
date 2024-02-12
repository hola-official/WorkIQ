const express = require("express");
const passport = require("passport");
const {
	signUp,
	login,
	logout,
  successRedirect,
	activateUser,
} = require("../controllers/authController");
const { googleAuthCallback, authenticateGoogle } = require("../middleware/passportMiddleware");

const router = express.Router();

// Google Signup with optional Google authentication
router.get(
	"/googleauth",
	authenticateGoogle
);

router.get("/googleauth/callback", googleAuthCallback, successRedirect);
router.post("/signup", signUp);
router.get("/activate-account", activateUser);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
