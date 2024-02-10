const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, taskController.createTask);
router.get('/:taskId/proposals', authMiddleware, taskController.getTaskProposals);
router.post('/:taskId/proposals', authMiddleware, taskController.submitProposal);

module.exports = router;
