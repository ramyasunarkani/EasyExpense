import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewExpense, fetchAllExpenses } from '../Store/expense-actions';

const ExpenseForm = () => {
  const dispatch=useDispatch();
  const [isActive, setIsActive] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: ''
  });

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('Expense Data:', formData);
    dispatch(addNewExpense({

      category:formData.category,
      amount:formData.amount,
      description:formData.description
    }))
    

    setFormData({
      category: '',
      amount: '',
      description: ''
    });

    setIsActive(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <button
        onClick={() => setIsActive(true)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded shadow"
      >
        Add Expense
      </button>

      <div
        className={`
          fixed  w-screen 
          bg-[#f0f8ff] p-5
          shadow-[0_-5px_10px_rgba(0,0,0,0.2)]
          transition-[bottom] duration-300 ease-in-out
          ${isActive ? 'bottom-0' : '-bottom-full'}
        `}
      >
        <span className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setIsActive(false)}
        >X</span>

        <div className="flex justify-center items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Expense</h2>
        </div>
        <form onSubmit={submitHandler} className="flex flex-wrap justify-center">
          <select
            name="category"
            value={formData.category}
            onChange={changeHandler}
            className="w-[30%] m-1 p-0.5 border"
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
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
            className="w-[30%]  border m-1 p-0.5"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={changeHandler}
            className="w-[30%] border m-1 p-0.5"
          />

          <div className="w-full flex justify-end">
    <button
      type="submit"
      className="w-[20%] bg-green-500 text-white m-1 p-1"
    >
      Add Expense
    </button>
  </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
