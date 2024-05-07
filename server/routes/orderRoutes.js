const express = require("express");
const {
  createOrder,
  submitRequirements,
  getOrderById,
} = require("../controllers/order.managementContoller");
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.post("/create-order/:sectionId", verifyJWT, createOrder);
router.post("/requirement", verifyJWT, submitRequirements);
router.get("/track/:sectionId/:orderId", verifyJWT, getOrderById);

module.exports = router;
