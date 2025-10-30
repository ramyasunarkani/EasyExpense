const express = require("express");
const router = express.Router();
const Authenticate=require('../middlewares/auth');

const {
  processPayment,
  checkPaymentStatus ,
} = require("../controllers/paymentController");

router.post("/pay",Authenticate, processPayment);
router.get("/payment-status/:orderId",Authenticate, checkPaymentStatus );




module.exports = router;
