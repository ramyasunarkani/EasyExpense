const { createOrder, getPaymentStatus } = require("../services/cashfreeService");
const { payment } = require("../models");

exports.processPayment = async (req, res) => {
  const orderId = "ORDER-" + Date.now();
  const orderAmount = 2000;
  const orderCurrency = "INR";

  const userId = req.user.id || null; 

  if (!userId) {
    return res.status(400).json({ error: "User ID is required in headers" });
  }

  try {
    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      userId,
      "9999999999"
    );

    await payment.create({
      orderId,
      paymentSessionId,
      orderAmount,
      orderCurrency,
      paymentStatus: "pending",
      UserId: userId,
    });

    res.json({ paymentSessionId, orderId });
  } catch (err) {
    console.error("Error during payment:", err);
    res.status(500).json({ error: "Payment failed", details: err.message });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user.id || null;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required in headers" });
    }

    const paymentStatus = await getPaymentStatus(orderId, userId);

    res.json(paymentStatus);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment status" });
  }
};
