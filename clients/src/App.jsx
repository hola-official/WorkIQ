import { React, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from "./pages/Home/AuthPage";
import "./index.css";
import ForgetingPwd from './components/authentications/ForgetingPwd';
import VerifyEmailForm from './components/authentications/VerifyEmailForm';
import GoogleAuth from './components/authentications/GoogleAuth';
import AccountConfirmation from './components/authentications/AccountConfirmation';
import AccountVerifyEmailForm from './components/authentications/AccountVerifyEmailForm';

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      <Route path="/auth/google-verify" element={<GoogleAuth />} />
      <Route path="/confirm-email" element={<AccountConfirmation />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/activate-verify" element={<AccountVerifyEmailForm />} />
      <Route path="/forget-password" element={<ForgetingPwd />} />
      <Route path="/activate-form" element={<VerifyEmailForm />} />
    </Routes>
  )
}

export default App
