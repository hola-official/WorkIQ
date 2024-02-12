import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import "./index.css";
import test from './test'

function App() {

  return (
    <Routes>
      <Route path='/' element={<test />} />
      <Route/>
    </Routes>
  )
}

export default App
