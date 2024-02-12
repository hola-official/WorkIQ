const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  sections: [
    {
      title: { type: String },
      description: { type: String },
      price: { type: Number },
    },
  ],
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  visibleTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Task", taskSchema);
