import React, { useState } from 'react';
import { loginUser} from '../Store/auth-actions';
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
    dispatch(loginUser({
      email: formData.email,
      password: formData.password,
      navigate,
    }));
  };

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-white to-blue-500 flex justify-center items-center content-center'>
      <section className='bg-white p-[30px] w-[23rem] rounded-[10px] shadow-amber-100'>
        <h1 className='mb-2 font-bold'>Login</h1>
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
        <div 
        className='underline cursor-pointer mb-1'
        onClick={()=>navigate('/forgot-password')}
        >Forgot Password?</div>
        <button
          className='w-full p-[6px] border-none rounded-[3px] mt-3 bg-green-200 cursor-pointer text-[1rem] box-border hover:bg-green-300'
          onClick={() => navigate('/signup')}
        >
          New to ExpenseTracker? Register Now
        </button>
      </section>
    </div>
  );
};

export default Login;
