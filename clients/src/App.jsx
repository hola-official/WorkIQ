import { React, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import "./index.css";
import ForgetingPwd from "./components/authentications/ForgetingPwd";
import VerifyEmailForm from "./components/authentications/VerifyEmailForm";
import GoogleAuth from "./components/authentications/GoogleAuth";
import AccountConfirmation from "./components/authentications/AccountConfirmation";
import AccountVerifyEmailForm from "./components/authentications/AccountVerifyEmailForm";
import { ROLES } from "../config/roles_list";
import RequireAuth from "./pages/Auth/features/RequireAuth";
import { Messages } from "./pages/messages/Messages";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CreateTask from "./pages/Tasks/Pages/CreateTaskPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ClientTasks from "./pages/Tasks/Pages/ClientTasks";
import EditTaskPage from "./pages/Tasks/Pages/editTask/EditTaskPage";
import EditSection from "./pages/Tasks/Pages/editTask/editSection/EditSection";
import TasksIndex from "./pages/TaskDisplay/TasksIndex";
import TaskInfo from "./pages/TaskDisplay/taskInfo/TaskInfo";
import Proposal from "./pages/TaskDisplay/proposal/Proposal";
import Applicants from "./pages/Tasks/applicants/Applicants";

function App() {
  return (
    <Routes>
      <Route path="/auth/google-verify" element={<GoogleAuth />} />
      <Route path="/confirm-email" element={<AccountConfirmation />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/activate-verify" element={<AccountVerifyEmailForm />} />
      <Route path="/forget-password" element={<ForgetingPwd />} />
      <Route path="/activate-form" element={<VerifyEmailForm />} />
      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile/:query" element={<ProfilePage />} />
      </Route>
      <Route
        element={
          <RequireAuth
            allowedRoles={[ROLES.Admin, ROLES.Client, ROLES.Freelancer]}
          />
        }
      >
        <Route path="projects">
          <Route index element={<TasksIndex />} />
          <Route path=":taskId/overview" element={<TaskInfo />} />
          <Route
            path="apply/:taskId/section/:sectionId"
            element={<Proposal />}
          />
          <Route path="applicants/:taskId/details" element={<Applicants />} />
        </Route>
      </Route>

      <Route
        element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Client]} />}
      >
        <Route path="clients">
          <Route path="my-tasks" element={<ClientTasks />} />
          <Route path="create-tasks" element={<CreateTask />} />
          <Route path="edit-task/:taskId" element={<EditTaskPage />} />
          <Route
            path="edit-task/:taskId/section/:sectionId"
            element={<EditSection />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
