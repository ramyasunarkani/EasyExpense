import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPaymentStatus } from "../Store/payment-actions";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId");
    if (orderId) {
      dispatch(fetchPaymentStatus(orderId)).finally(() => {
        localStorage.removeItem("lastOrderId");
      });
    }
  }, [dispatch]);

  return (
    <div>
      <NavBar />

      <main className="pt-24 px-6 min-h-screen bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
