import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import {deleteExpense} from '../../Store/expense-actions';

const Expense = ({ id, amount, category, description, index, isExpanded, onToggle }) => {
    const dispatch=useDispatch();

    const DeleteExp=(e)=>{
        e.stopPropagation();
        dispatch(deleteExpense(id))
        
    }
  return (
    <li onClick={onToggle} className='bg-blue-50 m-1 p-2'>
      <div className='flex justify-between'>
        <span>
        <strong>{category}</strong> - ₹{amount}
        </span>
        <button
            onClick={DeleteExp}
            className='cursor-pointer text-red-600 hover:text-red-800'
            >
            <RiDeleteBin6Line />
        </button>
      </div>
      {isExpanded && (
        <div >
          <em>{description}</em>
        </div>
      )}
    </li>
  );
};

export default Expense;
