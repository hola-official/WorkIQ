const express = require("express");
const router = express.Router();
const { depositFunds } = require("../controllers/TransactionController");
const verifyJWT = require("../middleware/verifyJWT");

// Create a proposal
router.post("/deposit-funds", verifyJWT, depositFunds);

module.exports = router;
