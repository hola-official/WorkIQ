import { React, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from "./pages/Auth/AuthPage";
import "./index.css";
import ForgetingPwd from './components/authentications/ForgetingPwd';
import VerifyEmailForm from './components/authentications/VerifyEmailForm';
import GoogleAuth from './components/authentications/GoogleAuth';
import AccountConfirmation from './components/authentications/AccountConfirmation';
import AccountVerifyEmailForm from './components/authentications/AccountVerifyEmailForm';
import { ROLES } from '../config/roles_list';
import RequireAuth from './pages/Auth/features/RequireAuth';
import DashboardPage from './pages/Dashboard/DashboardPage';
import CreateTask from './pages/Tasks/CreateTaskPage';

function App() {

  return (
    <Routes>
      <Route path="/auth/google-verify" element={<GoogleAuth />} />
      <Route path="/confirm-email" element={<AccountConfirmation />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/activate-verify" element={<AccountVerifyEmailForm />} />
      <Route
        element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks/create" element={<CreateTask />} />

      </Route>
      <Route path="/forget-password" element={<ForgetingPwd />} />
      <Route path="/activate-form" element={<VerifyEmailForm />} />
    </Routes>
  )
}

export default App
