import { load } from "@cashfreepayments/cashfree-js";
import axios from "./api";
import { toast } from "react-toastify";
import { authActions } from "./auth-reducer";


export function buyPremium() {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await axios.post(
        `/payment/pay`,
        {},
        { headers: { Authorization: token} }
      );

      if (!response.status || response.status >= 400) {
        throw new Error(response.data?.message || "Failed to initiate payment");
      }

      const { paymentSessionId, orderId } = response.data;

      localStorage.setItem("lastOrderId", orderId);

      const cashfree = await load({ mode: "sandbox" });

      await cashfree.checkout({
        paymentSessionId,
        redirect: true
      });
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };
}


export function fetchPaymentStatus(orderId) {
  return async (dispatch, getState) => {
    if (!orderId) throw new Error("Order ID is required");

    const token = getState().auth.token;
    try {
      const response = await axios.get(
        `/payment/payment-status/${orderId}`,
        { headers: { Authorization: token } }
      );

      const { paymentStatus, isPremium } = response.data;
      console.log(response.data)
      console.log(paymentStatus,'status');
      console.log(isPremium,'premium')

      if (paymentStatus === "successful") {
        toast.success("Payment Successful 🎉 You are now a Premium Member!");
      } else if (paymentStatus === "failed") {
        toast.error("Payment Failed ❌ Please try again.");
      } else if (paymentStatus === "pending") {
        toast.warning("Payment Pending ⏳ Please check again later.");
      }

      if (typeof isPremium === "boolean") {
        dispatch(authActions.updatePremium(isPremium));
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching payment status:", error);
      toast.error("Unable to verify payment status.");
      throw error;
    }
  };
}
