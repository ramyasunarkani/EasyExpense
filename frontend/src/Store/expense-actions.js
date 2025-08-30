import axios from "./api";
import { ExpenseActions } from './expenses-reducer'; 
import { reportActions } from "./report-reducer";


export function addNewExpense({ category, amount, description }) {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post('/expenses/addexpense', 
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

      await axios.delete(`/expenses/delete/${id}`, 
        { headers: { "Authorization": token } }
      );
      dispatch(ExpenseActions.deleteExpense(id));

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

      const stateLimit =
        limit ??
        getState().expenses.limit ??
        (Number(localStorage.getItem('expensesLimit')) || 6);

      const response = await axios.get(
        `/expenses/all?page=${page}&limit=${stateLimit}`,
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


export const fetchReport = (range) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(`/expenses/report?range=${range}`, {
        headers: { Authorization: token },
      });
      dispatch(reportActions.setReport(res.data.expenses));
    } catch (error) {
      console.error("Unable to fetch report", error);
    }
  };
};