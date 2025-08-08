import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const PremiumStatus = () => {
  const { orderId } = useParams(); // <-- reads from the path
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("No order ID found");
      return;
    }

    const fetchStatus = async () => {
      try {
        console.log(`http://localhost:3000/payment/payment-status/${orderId}`);
        const res = await axios.get(`http://localhost:3000/payment/payment-status/${orderId}`);
        setStatus(res.data);
      } catch (err) {
        console.error("Error fetching status", err);
        setError("Failed to fetch payment status");
      }
    };

    fetchStatus();
  }, [orderId]);

  if (error) return <div>{error}</div>;
  if (!status) return <div>Loading...</div>;

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{status.paymentStatus}</p>
    </div>
  );
};

export default PremiumStatus;
