import React, { useState } from 'react';
import { signUpUser } from '../Store/auth-actions';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
      signUpUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        navigate,
      })
    );
  };

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-[#ffffffe7] flex justify-center items-center pt-18">
      <section className="bg-white p-8 w-[23rem] max-w-[90%] rounded-[10px] shadow-2xl">
        <h1 className="mb-2 font-bold text-xl text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <div>
            <label htmlFor="pass" className="block font-medium">Password</label>
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <button
          className="w-full p-2 rounded mt-3 bg-green-200 cursor-pointer text-[1rem] hover:bg-green-300 transition-colors"
          onClick={() => navigate('/login')}
        >
          Have an account? Login
        </button>
      </section>
    </div>
  );
};

export default SignUp;
