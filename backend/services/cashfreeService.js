const { Cashfree, CFEnvironment } = require('cashfree-pg');
const { payment } = require("../models");
const axios = require("axios");

const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");

exports.createOrder = async (
  orderId,
  orderAmount,
  orderCurrency = "INR",
  customerID,
  customerPhone
) => {
  try {
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000); 
    const formattedExpiryDate = expiryDate.toISOString();

    const request = {
      order_amount: orderAmount,
      order_currency: orderCurrency,
      order_id: orderId,
      customer_details: {
        customer_id: customerID,
        customer_phone: customerPhone,
      },
      order_meta: {
      return_url: `http://localhost:5173/payment-status/${orderId}`,

      payment_methods: "cc,dc,upi",
        webhook_url: "https://localhost:3000/payment/webhook/cashfree" // ADD THIS

    },

      order_expiry_time: formattedExpiryDate,
    };

    const response = await cashfree.PGCreateOrder(request);
    return response.data.payment_session_id;
  } catch (err) {
    console.error("Cashfree order error:", err.response.data.message);
  }
};


exports.getPaymentStatus=async(orderId) =>{
  if (!orderId) throw new Error("Order ID is required");

  const cashfreeRes = await axios.get(
    `https://sandbox.cashfree.com/pg/orders/${orderId}`,
    {
      headers: {
        accept: "application/json",
        "x-client-id": "TEST430329ae80e0f32e41a393d78b923034",
        "x-client-secret": "TESTaf195616268bd6202eeb3bf8dc458956e7192a85",
        "x-api-version": "2022-09-01",
      },
    }
  );

  const cashfreeStatus = cashfreeRes.data.order_status;
  let normalizedStatus;

  if (cashfreeStatus === "PAID") {
    normalizedStatus = "successful";
  } else if (cashfreeStatus === "PENDING") {
    normalizedStatus = "pending";
  } else {
    normalizedStatus = "failed";
  }

  await payment.update(
    { paymentStatus: normalizedStatus },
    { where: { orderId } }
  );

  return normalizedStatus;
}