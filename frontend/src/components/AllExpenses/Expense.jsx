import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../Store/expense-actions';

const Expense = ({ id, amount, category, description, createdAt }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className="flex justify-between items-center p-1.5 border rounded shadow-sm hover:shadow-md transition bg-white">
      {/* All details in one row */}
      <div className="flex gap-6 items-center text-sm">
        <span className="font-semibold text-lg">₹{amount}</span>
        <span className="text-gray-600">{category}</span>
        {description && <span className="italic">{description}</span>}
        <span className="text-gray-400 text-xs">{createdAt}</span>
      </div>

      <button
        onClick={handleDelete}
        className="bg-gray-200 text-black px-3 py-1 rounded hover:border-red-400 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default Expense;
