const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  sections: [{ type: Schema.Types.ObjectId, ref: 'TaskSection' }],
  isApproved: { type: Boolean, default: false },
  issueDate: Date,
  dueDate: Date,
  grandTotal: Number,
  taskStatus: {
    type: String,
    default: "Review",
  },
  // Additional fields as needed.
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
