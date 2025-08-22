import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userForgotPassword } from '../Store/auth-actions';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    dispatch(userForgotPassword(email));
  };

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-[#ffffffe7] flex justify-center items-center pt-14">
      <section className="bg-white p-8 w-[23rem] max-w-[90%] rounded-[10px] shadow-2xl">
        <h1 className="mb-2 font-bold text-xl text-center">Forgot Password</h1>
        <p className="text-gray-500 text-center mb-4 text-sm">
          Oops... Looks like you forgot something!
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded transition-colors"
          >
            Reset Password
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full border border-gray-400 text-gray-700 hover:bg-gray-100 py-2 rounded transition-colors"
        >
          Back to Login
        </button>
      </section>
    </div>
  );
};

export default ForgotPasswordPage;
