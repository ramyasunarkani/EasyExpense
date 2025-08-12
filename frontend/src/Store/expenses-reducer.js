import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    allExpenses: [],
    totalExpenses: 0,
    totalPages: 0,
    currentPage: 1
  },
  reducers: {
    fetchAll(state, action) {
      state.allExpenses = action.payload.expenses;
      state.totalExpenses = action.payload.totalExpenses;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    addNewExpense(state, action) {
      state.allExpenses.unshift(action.payload);
    },
    deleteExpense(state, action) {
      state.allExpenses = state.allExpenses.filter(exp => exp.id !== action.payload);
    }
  }
});

export const ExpenseActions = expensesSlice.actions;
export default expensesSlice.reducer;
