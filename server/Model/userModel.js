const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client", "freelancer", "admin"],
    default: "client",
  },
  location: { type: String },
  avatar: { type: String },
  bio: { type: String },
  portfolios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }],
  tasksCompleted: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  joinDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  isAdminApproved: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
