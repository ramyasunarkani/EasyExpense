import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-reducer';
import expenseReducer from './expenses-reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses:expenseReducer
  },
});

export default store;
