import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialName = localStorage.getItem('name');
const initialIsPremium = localStorage.getItem('isPremium') === 'true';
const initialState = {
  token: initialToken,
  name: initialName,
  isPremium: initialIsPremium,
  isLoggedIn: !!initialToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { token, name, isPremium } = action.payload;
      state.token = token;
      state.name = name;
      state.isPremium = isPremium;
      state.isLoggedIn = !!token;

      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('isPremium', isPremium); 
    },
    logout(state) {
      state.token = null;
      state.name = null;
      state.isPremium = false;
      state.isLoggedIn = false;

      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('isPremium');
    },
    updatePremium(state, action) {
      state.isPremium = action.payload;
      localStorage.setItem('isPremium', action.payload);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
