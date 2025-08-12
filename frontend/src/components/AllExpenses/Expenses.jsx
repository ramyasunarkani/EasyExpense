import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Expense from './Expense';
import { fetchAllExpenses } from '../../Store/expense-actions';
import Pagination from '../Pagination ';

const Expenses = () => {
  const dispatch = useDispatch();
  const { allExpenses = [], totalPages = 0, currentPage = 1, limit: stateLimit } = useSelector(state => state.expenses);

  // Load limit from localStorage or Redux state
  const [limit, setLimit] = useState(() => {
    return Number(localStorage.getItem('expensesLimit')) || stateLimit || 5;
  });

  useEffect(() => {
    localStorage.setItem('expensesLimit', limit);
    dispatch(fetchAllExpenses(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      dispatch(fetchAllExpenses(page, limit));
    }
  };

  if (!allExpenses || allExpenses.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No expenses found.</p>;
  }

  return (
    <div className="max-w-full mx-auto p-4 border border-gray-200 flex flex-col gap-4">
      {/* Limit selector */}
      <div className="flex justify-end items-center gap-2">
        <label htmlFor="limit" className="text-sm font-medium">Items per page:</label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border p-1 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
        </select>
      </div>

      {/* Expenses List */}
      <div className="grid gap-2">
        {allExpenses.map(expense => (
          <Expense key={expense.id} {...expense} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={changePage}
      />
    </div>
  );
};

export default Expenses;
