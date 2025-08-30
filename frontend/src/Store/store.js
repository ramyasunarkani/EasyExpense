import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-reducer';
import expenseReducer from './expenses-reducer';
import premiumReducer from './premium-reducer';
import reportReducer from "./report-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses:expenseReducer,
    premium:premiumReducer,
    report:reportReducer
    },
});

export default store;
