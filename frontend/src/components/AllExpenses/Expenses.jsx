import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Expense from './Expense';

const Expenses = () => {
  const expensesList = useSelector(state => state.expenses.allExpenses);
  const [expandedIndexes, setExpandedIndexes] = useState(new Set());
  console.log('1')

  const toggleDescription = (index) => {
    const updatedSet = new Set(expandedIndexes);
    updatedSet.has(index) ? updatedSet.delete(index) : updatedSet.add(index);
    setExpandedIndexes(updatedSet);
  };

  return (
    <ul>
      {expensesList.map((expense, index) => (
        <Expense
          key={expense.id}
          id={expense.id}
          amount={expense.amount}
          category={expense.category}
          description={expense.description}
          index={index}
          isExpanded={expandedIndexes.has(index)}
          onToggle={() => toggleDescription(index)}
        />
      ))}
    </ul>
  );
};

export default Expenses;
