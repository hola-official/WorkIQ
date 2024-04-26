const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      // required: true
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      // required: true
    },
    proposal: {
      type: Schema.Types.ObjectId,
      ref: "Proposal",
      // required: true
    },
    reference: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
