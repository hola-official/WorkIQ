import { React, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
// import Signup from "./pages/Signup";
import "./index.css";

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      {/* <Route
        exact
        path="/"
        element={<Test user={user} setUser={setUser} />}
      /> */}
      {/* <Route
        exact
        path="/home"
        element={user ? <Home user={user} /> : <Navigate to="/login" />}
      /> */}
      {/* <Route
        exact
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      /> */}
      {/* <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Signup />}
      /> */}
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
