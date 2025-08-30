import React, { useState } from 'react';
import { loginUser } from '../Store/auth-actions';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
        navigate,
      })
    );
  };

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-[#ffffffe7] flex justify-center items-center pt-14">
      <section className="bg-white shadow-2xl p-8 w-[23rem] max-w-[90%] rounded-[10px]">
        <h1 className="mb-2 font-bold text-xl text-center text-[#013a37">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="control-input w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="control-input w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-2 bg-[#00786F] text-white rounded hover:bg-[#013a37] transition-colors"
          >
            Login
          </button>
        </form>
        <div
          className="underline cursor-pointer mb-1 mt-2 text-blue-600 text-sm"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </div>
        <button
          className="w-full p-2 text-white rounded mt-3 bg-[#00786F] cursor-pointer text-[1rem] hover:bg-[#013a37] transition-colors"
          onClick={() => navigate('/signup')}
        >
          New to ExpenseTracker? Register Now
        </button>
      </section>
    </div>
  );
};

export default Login;
