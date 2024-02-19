import { React, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from "./pages/AuthPage";
import "./index.css";
import ForgetingPwd from './components/authentications/ForgetingPwd';

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/forget-password" element={<ForgetingPwd />} />
    </Routes>
  )
}

export default App
