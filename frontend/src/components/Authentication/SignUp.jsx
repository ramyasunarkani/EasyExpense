import React, { useState } from 'react';
import { signUpUser } from '../../Store/auth-actions';
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
    dispatch(signUpUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      navigate,
    }));
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-white to-blue-500 flex justify-center items-center content-center'>
      <section className='bg-white p-[30px] w-[23rem] rounded-[10px] shadow-amber-100'>
        <h1 className='mb-2 font-bold'>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name' className='block'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className='control-input'
            />
          </div>
          <div>
            <label htmlFor='email' className='block'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='control-input'
            />
          </div>
          <div>
            <label htmlFor='pass' className='block'>Password</label>
            <input
              type='password'
              id='pass'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className='control-input'
            />
          </div>
          <button
            type='submit'
            className='w-full p-[6px] mt-2 bg-violet-600 text-white border-none rounded-[3px] cursor-pointer text-[16px] box-border hover:bg-violet-700'
          >
            Sign Up
          </button>
        </form>
        <button
          className='w-full p-[6px] border-none rounded-[3px] mt-3 bg-green-200 cursor-pointer text-[1rem] box-border hover:bg-green-300'
          onClick={() => navigate('/login')}
        >
          Have an account? Login
        </button>
      </section>
    </div>
  );
};

export default SignUp;
