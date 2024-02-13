import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import "./index.css";
import Test from './test'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Test />} />
      <Route/>
    </Routes>
  )
}

export default App
