const { createOrder, getPaymentStatus } = require("../services/cashfreeService");
const { payment } = require("../models");

exports.processPayment = async (req, res) => {
  const orderId = "ORDER-" + Date.now();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerID = "123";
  const customerPhone = "9999999999";

  try {
    const paymentSessionId = await createOrder(
      orderId,
      orderAmount,
      orderCurrency,
      customerID,
      customerPhone
    );

    await payment.create({
      orderId,
      paymentSessionId,
      orderAmount,
      orderCurrency,
      paymentStatus: "pending",
    });
    console.log('table created yarrr s')
    console.log({ paymentSessionId, orderId })

    return res.json({ paymentSessionId, orderId });
  } catch (err) {
    console.error("Error during payment:", err);
    res.status(500).json({ error: "Payment failed", details: err.message });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    console.log("Full URL:", req.url);
    console.log("OrderId param:", req.params.orderId);

    const orderId = req.params.orderId;
    const paymentStatus = await getPaymentStatus(orderId); 

    res.json({ orderId, paymentStatus });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment status" });
  }
};


