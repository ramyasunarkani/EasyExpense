import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router'
import { userForgotPassword } from '../Store/auth-actions';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
   const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
     dispatch(userForgotPassword(email));
  };


  return (
    <div className="w-screen h-screen bg-gradient-to-r from-white to-blue-500 flex justify-center items-center">
      <section className="bg-white w-sm p-6 rounded-xl shadow-lg">
        <div className="mb-4">
          <h1 className="text-2xl font-bold font-serif">Forgot Password</h1>
          <p className="text-gray-500 mt-1">
            Oops... Looks like you forgot something!
          </p>
        </div>

        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-serif text-gray-700">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
               value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300  px-3 py-2 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-900 hover:bg-violet-950 text-white py-2 cursor-pointer"
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
          onClick={() => navigate('/')}
          className="w-full border border-gray-400 text-gray-700 hover:bg-gray-100 py-2 cursor-pointer"
        >
          Back to Login
        </button>
      </section>
    </div>
  )
}

export default ForgotPasswordPage
