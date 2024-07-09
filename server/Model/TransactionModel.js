const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: false, // make optional
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: false, // make optional
    },
    proposal: {
      type: Schema.Types.ObjectId,
      ref: "Proposal",
      required: false, // make optional
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    depositAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "canceled", "success"], // added "success"
      default: "pending",
    },
    sectionPrice: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },
    sectionDurationDays: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
