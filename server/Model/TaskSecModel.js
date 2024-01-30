const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSectionSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  // Additional fields as needed.
});

const TaskSection = mongoose.model('TaskSection', taskSectionSchema);

module.exports = TaskSection;
