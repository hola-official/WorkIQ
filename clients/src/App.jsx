import { React, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from "./pages/AuthPage";
import "./index.css";

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
