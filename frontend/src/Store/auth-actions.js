import axios from 'axios';
import { authActions } from './auth-reducer';
import { toast } from 'react-toastify';


export const signUpUser = ({ name, email, password, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://3.108.252.169/api/user/signup',
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
        'http://3.108.252.169/api/user/login',
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
      const res=await axios.post('http://3.108.252.169/api/password/forgotpassword ',{email});
      console.log(res);
    } catch (error) {
      console.error(error,'unable send link')
      
    }


  }
}


export const updatePasswordAction = (resetpasswordid, newpassword, navigate) => {
  return async (dispatch) => {
    if (!newpassword.trim()) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        `http://3.108.252.169/api/password/updatepassword/${resetpasswordid}`,
        { newpassword }
      );
      toast.success(response.data.success || "Password updated successfully!");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to update password.";
      toast.error(errorMessage);
    }
  };
};
