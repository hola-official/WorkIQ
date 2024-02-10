const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Task.sections" },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isAssigned: { type: Boolean, default: false },
});

module.exports = mongoose.model("Proposal", proposalSchema);
