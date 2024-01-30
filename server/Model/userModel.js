const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "subscriber",
    // subscriber, author, and admin (suspended)
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // Additional fields based on user details, e.g., name, role, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
