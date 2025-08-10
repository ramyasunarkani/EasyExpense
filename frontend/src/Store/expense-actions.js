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
export function fetchAllExpenses(){

    return async(dispatch,getState)=>{
        try {
            const token = getState().auth.token;
            const response=await axios.get(`${expenseURL}/all`,{headers:{"Authorization":token}});
            dispatch(ExpenseActions.fetchAll(response.data))
            console.log(response.data);
            
        } catch (error) {
            console.log('unable fetches expense',error);
            
        }
    }

}