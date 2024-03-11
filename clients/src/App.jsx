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
import ProfilePage from './pages/Profile/ProfilePage';

function App() {

  return (
    <Routes>
      <Route path="/auth/google-verify" element={<GoogleAuth />} />
      <Route path="/confirm-email" element={<AccountConfirmation />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/activate-verify" element={<AccountVerifyEmailForm />} />
      <Route path="/forget-password" element={<ForgetingPwd />} />
      <Route path="/activate-form" element={<VerifyEmailForm />} />
      <Route
        element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
      >

        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="profile/:query" element={<ProfilePage />} />

      </Route>

      <Route
        element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Client]} />}>
        <Route path='clients'>
          <Route path="task/create" element={<CreateTask />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
