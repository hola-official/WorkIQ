const Task = require('../Model/TaskModel');
const Proposal = require('../Model/ProposalModel');

// Controller for creating a new task
exports.createTask = async (req, res) => {
  try {
    // Create task with pending status
    const newTask = await Task.create({ ...req.body, client: req.user._id, status: 'pending' });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for fetching proposals for a task
exports.getTaskProposals = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId).populate('proposals');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task.proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for submitting a proposal for a task
exports.submitProposal = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { content } = req.body;
    const newProposal = await Proposal.create({
      task: taskId,
      freelancer: req.user._id,
      content
    });
    // Add proposal to task
    await Task.findByIdAndUpdate(taskId, { $push: { proposals: newProposal._id } });
    res.status(201).json(newProposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
