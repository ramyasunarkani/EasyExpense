
import { Route, Routes } from 'react-router'
import './App.css'
import SignUp from './components/Authentication/SignUp'

function App() {

  return (
    <Routes>
      <Route path='signup' element={<SignUp/>}/>
    </Routes>
  )
}

export default App
