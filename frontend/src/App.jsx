
import { Route, Routes } from 'react-router'
import './App.css'
import SignUp from './components/Authentication/SignUp'
import Login from './components/Authentication/Login'

function App() {

  return (
    <Routes>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='login' element={<Login/>}/>
    </Routes>
  )
}

export default App
