import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewExpense, fetchAllExpenses } from "../Store/expense-actions";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages, allExpenses, limit } = useSelector(
    (state) => state.expenses
  );

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addNewExpense(formData));

    if (currentPage === totalPages && allExpenses.length >= limit) {
      await dispatch(fetchAllExpenses(totalPages + 1, limit));
    } else {
      await dispatch(fetchAllExpenses(currentPage, limit));
    }

    setFormData({ category: "", amount: "", description: "" });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto mt-14">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Expense</h2>
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={changeHandler}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-400"
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={changeHandler}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={changeHandler}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-violet-700 transition-colors"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
