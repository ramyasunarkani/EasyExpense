import { createSlice } from "@reduxjs/toolkit";

const ExpensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    allExpenses: [],
  },
  reducers: {
    fetchAll(state, action) {
      state.allExpenses = action.payload;
    },
    addNewExpense(state, action) {
      state.allExpenses.push(action.payload);
    },
    deleteExpense(state, action) {
      const idToDelete = action.payload;
      state.allExpenses = state.allExpenses.filter(exp => exp.id !== idToDelete);
    }
  }
});

export const ExpenseActions = ExpensesSlice.actions;

export default ExpensesSlice.reducer;
