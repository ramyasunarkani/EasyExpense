const { createOrder, getPaymentStatus } = require("../services/cashfreeService");
const {Payment} = require("../models"); 


const processPayment = async (req, res) => {
  try {
    const orderId = "ORDER-" + Date.now();
    const orderAmount = 2000;
    const orderCurrency = "INR";

    const userId = req.user?._id; 
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      userId.toString(),
      "9999999999"
    );

    await Payment.create({
      orderId,
      paymentSessionId,
      paymentStatus: "pending",
      userId,
    });

    res.status(201).json({
      message: "Payment session created successfully",
      paymentSessionId,
      orderId,
    });
  } catch (err) {
    console.error("Error during payment:", err);
    res.status(500).json({ error: "Payment failed", details: err.message });
  }
};


const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is missing or invalid" });
    }

    const paymentStatusResponse = await getPaymentStatus(orderId, userId.toString());

    await Payment.findOneAndUpdate(
      { orderId },
      { paymentStatus: paymentStatusResponse.paymentStatus },
      { new: true }
    );

    res.status(200).json(paymentStatusResponse);
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ error: "Failed to fetch payment status" });
  }
};


module.exports={processPayment,getPaymentStatus};