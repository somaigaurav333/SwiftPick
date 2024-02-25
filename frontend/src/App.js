import "./App.css";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SingUp from "./Components/SingUp";
import Login from "./Components/Login"

const App = () => {
  return (
    <Routes>
      <Route path="/auth/signup" element={<SingUp/>} />
      <Route path="/auth/login" element = {<Login/>} />
    </Routes>
  )
}

export default App
