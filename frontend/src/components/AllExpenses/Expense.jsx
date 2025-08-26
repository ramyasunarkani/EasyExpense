import React from "react";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../../Store/expense-actions";

const Expense = ({ id, description, category, amount }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteExpense(id));
  };

  

  return (
    <tr className="border-b border-gray-600">
      <td className="px-4 py-2">{description}</td>
      <td className="px-4 py-2">{category}</td>
      <td className="px-4 py-2">₹{amount}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
      
    </tr>
  );
};

export default Expense;
