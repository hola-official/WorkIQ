const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.put('/update/:userId', verifyJWT, userController.updateUser);
router.delete('/:userId', verifyJWT, userController.deleteUser);
router.get('/:query', verifyJWT, userController.getUserProfile);

module.exports = router;
