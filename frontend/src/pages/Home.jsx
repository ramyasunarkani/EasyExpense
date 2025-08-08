import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import Expenses from '../components/AllExpenses/Expenses'
import PremiumButton from '../components/PremiumButton'

const Home = () => {
  return (
    <>
    <header
    className="flex justify-center px-2 py-2"><PremiumButton/></header>
    <Expenses/>
      <ExpenseForm/>
    </>
  )
}

export default Home