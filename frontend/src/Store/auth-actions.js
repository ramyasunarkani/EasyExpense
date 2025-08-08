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
      
      const token = response.data.token;

      
      dispatch(authActions.login(token));

      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong!'||err;
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
