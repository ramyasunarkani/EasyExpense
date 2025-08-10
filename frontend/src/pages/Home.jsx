import React, { useEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import Expenses from '../components/AllExpenses/Expenses'
import Header from '../components/Header'
import { useDispatch } from 'react-redux'
import { fetchPaymentStatus } from '../Store/payment-actions'
import { Outlet, useLocation } from 'react-router'

const Home = () => {
  const dispatch=useDispatch()
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
    <>
      {isMainHome && (
        <>
          <Header />
          <Expenses />
          <ExpenseForm />
        </>
      )}
      <Outlet />
    </>
  )
}

export default Home