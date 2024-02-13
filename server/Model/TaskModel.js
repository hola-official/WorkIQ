const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  durationDays: { type: Number, required: true },
  category: { type: String },
  skills: [{ type: String }],
  sections: [
    {
      title: { type: String },
      description: { type: String },
      price: { type: Number },
    },
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  visibleTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Task", taskSchema);
