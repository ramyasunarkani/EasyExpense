import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updatePasswordAction } from '../Store/auth-actions';

export default function UpdatePassword() {
  const { resetpasswordid } = useParams();
  const [newpassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatePasswordAction(resetpasswordid, newpassword, navigate));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Update Password
      </h2>
      <form onSubmit={handleUpdate} className="flex flex-col">
        <input
          type="password"
          placeholder="Enter new password"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition"
        >
          Update Password
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
}
