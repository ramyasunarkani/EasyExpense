
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllExpenses } from './Store/expense-actions'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeaderBoard from './components/LeaderBoard'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import UpdatePassword from './pages/UpdatePassword'
import Header from './components/Header'
import ExpenseForm from './components/ExpenseForm'
import Expenses from './components/AllExpenses/Expenses'
import ReportTable from './components/ReportTable'

function App() {
  const dispatch=useDispatch();
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  const PrivateRoute=({element})=>{
    return isLoggedIn?element:<Navigate to='/login'/>
  }
  const PublicRoute = ({ element }) => {
  return !isLoggedIn ? element : <Navigate to="/home" />;
};
useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAllExpenses());
    }
  }, [isLoggedIn]);

  return (
       <>
          <ToastContainer position="top-right" autoClose={3000} />
          <Header/>
          <Routes>

            <Route path='/' element={<Navigate to='/login'/>}/>
            <Route path='signup' element={<PublicRoute element={<SignUp/>}/>}/>
            <Route path='login' element={<PublicRoute element={<Login/>}/>}/>
            <Route path='/forgot-password' element={<PublicRoute element={<ForgotPasswordPage/>}/>}/>
            <Route path="/update-password/:resetpasswordid" element={<UpdatePassword />} />

            <Route path='/home' element={<PrivateRoute element={<Home/>}/>}>
            <Route index element={<Navigate to="add" replace />} />
             <Route path='add' element={<ExpenseForm/>}/>
             <Route path='report' element={<ReportTable/>}/>
              <Route path='leaderboard' element={<LeaderBoard/>}/>
              <Route path='expenses' element={<Expenses/>}/>
            </Route>

          </Routes>
       </>
  )
}

export default App
