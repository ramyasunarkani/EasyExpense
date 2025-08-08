
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAllExpenses } from './Store/expense-actions'
import PremiumStatus from './components/PremiumStatus'

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
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path='signup' element={<PublicRoute element={<SignUp/>}/>}/>
      <Route path='login' element={<PublicRoute element={<Login/>}/>}/>
      <Route path='home' element={<PrivateRoute element={<Home/>}/>}/>
      <Route path="/payment-status/:orderId" element={<PremiumStatus />} />

    </Routes>
  )
}

export default App
