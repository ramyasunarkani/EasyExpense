import axios from 'axios';

export const signUpUser = ({ name, email, password, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/signup',
        {
          name,
          email,
          password,
        }
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
        {
          email,
          password,
        }
      );

      alert(response.data.message || "Account created successfully!");
      navigate('/home');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong!';
      alert(`Error: ${errorMessage}`);
    }
  };
};
