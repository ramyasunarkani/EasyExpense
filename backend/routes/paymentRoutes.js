const express = require("express");
const { getPaymentStatus } = require("../controllers/paymentController");
const router = express.Router();
const {
  processPayment,
} = require("../controllers/paymentController");

router.post("/pay", processPayment);
router.get("/payment-status/:orderId", getPaymentStatus);



module.exports = router;
