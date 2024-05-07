const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true
    },
    proposal: {
      type: Schema.Types.ObjectId,
      ref: "Proposal",
      required: true
    },
    reference: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "canceled"],
      default: "pending"
    },
    sectionPrice: {
      type: Number,
      // required: true
    },
    totalPrice: {
      type: Number,
      // required: true
    },
    paymentMethod: {
      type: String,
      // required: true
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending"
    },
    sectionDurationDays: {
      type: Number,
      // required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
