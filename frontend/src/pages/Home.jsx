import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPaymentStatus } from "../Store/payment-actions";
import { Outlet, useLocation } from "react-router";
import SideBar from "../components/SideBar";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const orderId = localStorage.getItem("lastOrderId");
    if (orderId) {
      dispatch(fetchPaymentStatus(orderId)).finally(() => {
        localStorage.removeItem("lastOrderId");
      });
    }
  }, [dispatch]);

  const isMainHome = location.pathname === "/home";

  return (
    <div className="flex">
      {/* Sidebar stays fixed */}
      <SideBar />

      {/* Main Content Area */}
      <main className="ml-64 w-full min-h-[calc(100vh-56px)] bg-gray-100 p-6 pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
