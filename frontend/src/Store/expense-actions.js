import axios from "axios";
import { ExpenseActions } from './expenses-reducer'; 

const expenseURL = 'http://localhost:3000/expenses';

export function addNewExpense({ category, amount, description }) {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(`${expenseURL}/addexpense`, 
        { category, amount, description },
        { headers: { "Authorization": token } }
      );
      dispatch(ExpenseActions.addNewExpense(response.data.expense));
    } catch (error) {
      console.log('Unable to add expense', error);
    }
  };
}

export function deleteExpense(id) {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const { currentPage, allExpenses, limit } = getState().expenses;

      await axios.delete(`${expenseURL}/delete/${id}`, 
        { headers: { "Authorization": token } }
      );
      dispatch(ExpenseActions.deleteExpense(id));

      // If last item on last page is deleted → go back one page
      if (currentPage > 1 && allExpenses.length === 1) {
        dispatch(fetchAllExpenses(currentPage - 1, limit));
      } else {
        dispatch(fetchAllExpenses(currentPage, limit));
      }
    } catch (error) {
      console.log('Unable to delete expense', error);
    }
  };
}

export function fetchAllExpenses(page = 1, limit) {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;

      // Explicit grouping so TS knows the order
      const stateLimit =
        limit ??
        getState().expenses.limit ??
        (Number(localStorage.getItem('expensesLimit')) || 6);

      const response = await axios.get(
        `${expenseURL}/all?page=${page}&limit=${stateLimit}`,
        { headers: { "Authorization": token } }
      );

      dispatch(
        ExpenseActions.fetchAll({
          ...response.data,
          limit: stateLimit
        })
      );
    } catch (error) {
      console.log('Unable to fetch expenses', error);
    }
  };
}
