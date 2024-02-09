const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client", "freelancer", "admin"],
    default: "freelancer",
  },
  location: String,
  avatar: String,
  bio: String,
  portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
  tasksCompleted: { type: Number, default: 0 },
  pointsEarned: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isAdminApproved: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
  joinDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
