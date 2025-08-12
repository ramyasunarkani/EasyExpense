import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../Store/expense-actions';

const Expense = ({ id, amount, category, description, createdAt }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExpense(id));
  };

  return (
    <div className="flex justify-between items-center p-3 border rounded shadow-sm hover:shadow-md transition bg-white">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-lg font-semibold">₹{amount}</span>
        <span className="text-sm text-gray-600">{category}</span>
        {description && <span className="text-sm italic">{description}</span>}
        <span className="text-xs text-gray-400">{createdAt}</span>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default Expense;
