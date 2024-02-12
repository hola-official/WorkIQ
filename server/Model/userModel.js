const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    Client: {
      type: String,
      default: "Client",
    },
    Freelancer: String,
    Admin: String,
  },
  location: { type: String },
  avatar: { type: String },
  bio: { type: String },
  portfolios: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }],
  TaskCompleted: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  createdTask: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  refreshToken: String,
  points: [
    {
      description: String,
      amount: Number,
      date: Date,
    },
  ],
  badges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
  skills: [{ type: String }],
  category: { type: String },
  website: { type: String },
  socialMedia: {
    twitter: { type: String },
    linkedin: { type: String },
    github: { type: String },
  },
  experience: {
    title: { type: String },
    company: { type: String },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    // Add other experience details as needed
  },
},
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
