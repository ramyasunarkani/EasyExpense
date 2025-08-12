import axios from "axios"
const expenseURL='http://localhost:3000/expenses';
import { ExpenseActions } from './expenses-reducer'; 



export function addNewExpense({category,amount,description}){
    return async(dispatch,getState)=>{
        try {
            const token = getState().auth.token;

            const response=await axios.post(`${expenseURL}/addexpense`, { category, amount, description },{headers:{"Authorization":token}});
            dispatch(ExpenseActions.addNewExpense(response.data.expense))
            
        } catch (error) {
            console.log('unable add expense',error);
            
        }
    }

}
export function deleteExpense(id){
    return async(dispatch,getState)=>{
        try {
            const token = getState().auth.token;

            const response=await axios.delete(`${expenseURL}/delete/${id}`,{headers:{"Authorization":token}});
            console.log(response.data);

            dispatch(ExpenseActions.deleteExpense(id))
        } catch (error) {
            console.log('unable delete expense');
            
        }
    }

}
export function fetchAllExpenses(page = 1, limit = 6) {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${expenseURL}/all?page=${page}&limit=${limit}`,
        { headers: { "Authorization": token } }
      );

      dispatch(ExpenseActions.fetchAll(response.data));
    } catch (error) {
      console.log('Unable to fetch expenses', error);
    }
  };
}
