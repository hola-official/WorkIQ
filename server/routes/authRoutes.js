const express = require("express");
const passport = require("passport");
const {
	signUp,
	login,
	logout,
	// getCurrentUserInfo,
	activateUser,
	passwordReset,
	confirmPasswordResetOTP,
	passwordResetConfirmed,
	generateGoogleAuthCookie,
} = require("../controllers/authController");
const { googleAuthCallback, authenticateGoogle } = require("../middleware/passportMiddleware");

const router = express.Router();

// Google Signup with optional Google authentication
router.get(
	"/googleauth",
	authenticateGoogle
);

router.get("/google/callback", googleAuthCallback, generateGoogleAuthCookie);
// router.get("/google/success", getCurrentUserInfo);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/activate-account", activateUser);
router.post("/reset-password", passwordReset);
router.post("/reset-password/confirm", confirmPasswordResetOTP);
router.put("/reset-password/finish", passwordResetConfirmed);
router.post("/logout", logout);

module.exports = router;
