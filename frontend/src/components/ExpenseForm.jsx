import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewExpense, fetchAllExpenses } from '../Store/expense-actions';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(state => state.expenses);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(addNewExpense(formData));
    await dispatch(fetchAllExpenses(currentPage, 6));

    setFormData({
      category: '',
      amount: '',
      description: ''
    });
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="p-2">
      <form onSubmit={submitHandler} className="flex justify-between items-center gap-2">
        <select
          name="category"
          value={formData.category}
          onChange={changeHandler}
          className="border p-1 rounded w-[20%]"
          required
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={changeHandler}
          className="border p-1 rounded w-[20%]"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={changeHandler}
          className="border p-1 rounded w-[40%]"
        />

        <button
          type="submit"
          className="bg-gray-200 text-black px-4 py-1  hover:bg-gray-300"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
