const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    default: 0,
    // required: true,
  },
  durationDays: { type: Number, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  skills: [{ type: String }],
  doc: { type: String },
  sections: [
    {
      title: { type: String },
      description: { type: String },
      timeframe: { type: Number, required: true },
      price: { type: Number },
    },
  ],
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  visibleTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Task", taskSchema);
