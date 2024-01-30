const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
  freelancer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  section: { type: Schema.Types.ObjectId, ref: 'TaskSection' },
  amount: { type: Number, required: true },
  isAssigned: { type: Boolean, default: false },
  // Additional fields as needed.
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
