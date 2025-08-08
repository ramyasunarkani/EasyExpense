import { load } from "@cashfreepayments/cashfree-js";
import { useNavigate } from "react-router";

const PremiumButton = () => {
  const navigate = useNavigate();

  const handleBuyPremium = async () => {
    try {
      const response = await fetch("http://localhost:3000/payment/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate payment");
      }

      const { paymentSessionId, orderId } = data;

      const cashfree = await load({ mode: "sandbox" }); // Use "production" in live

      await cashfree.checkout({
        paymentSessionId,
        redirect: false,
        onSuccess: (data) => {
          console.log("Payment Success:", data);
          navigate(`/payment-status/${orderId}`);
        },
        onFailure: (data) => {
          console.log("Payment Failed:", data);
          navigate(`/payment-status/${orderId}`);
        },
      });
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handleBuyPremium}
      className="fixed top-4 right-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
    >
      Buy Premium Membership
    </button>
  );
};

export default PremiumButton;
