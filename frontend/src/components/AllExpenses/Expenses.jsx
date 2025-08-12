import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Expense from './Expense';
import { fetchAllExpenses } from '../../Store/expense-actions';
import Pagination from '../Pagination ';

const Expenses = () => {
  const dispatch = useDispatch();
  const { allExpenses = [], totalPages = 0, currentPage = 1 } = useSelector(state => state.expenses);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
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
    <div className="max-w-full mx-auto p-4 border border-gray-200">
      
      {/* Header Row with title & select */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Expenses</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm font-medium">Expenses per page:</label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border p-1 rounded"
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

     <div className="space-y-3">
        {allExpenses.map(expense => (
          <Expense key={expense.id} {...expense} />
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default Expenses;
