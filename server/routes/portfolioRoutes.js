const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, portfolioController.createPortfolio);
router.put('/:portfolioId', authMiddleware, portfolioController.updatePortfolio);
router.delete('/:portfolioId', authMiddleware, portfolioController.deletePortfolio);
router.get('/', authMiddleware, portfolioController.getAllPortfolios);

module.exports = router;
