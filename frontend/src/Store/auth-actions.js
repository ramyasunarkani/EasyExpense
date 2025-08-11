import axios from 'axios';
import { authActions } from './auth-reducer';

export const signUpUser = ({ name, email, password, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/signup',
        { name, email, password }
      );

      alert(response.data.message || "Account created successfully!");
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong!';
      alert(`Error: ${errorMessage}`);
    }
  };
};

export const loginUser = ({ email, password, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { email, password }
      );
      
      const { token, name, isPremium } = response.data.user;

      dispatch(authActions.login({ token, name, isPremium }));

      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong!';
      alert(`Error: ${errorMessage}`);
    }
  };
};


export const logoutUser = (navigate) => {
  return (dispatch) => {
    dispatch(authActions.logout());
    if (navigate) navigate('/login');
  };
};

export const userForgotPassword=(email)=>{
  return async (dispatch)=>{
    try {
      const res=await axios.post('http://localhost:3000/password/forgotpassword ',{email});
      console.log(res);
    } catch (error) {
      console.error(error,'unable send link')
      
    }


  }
}