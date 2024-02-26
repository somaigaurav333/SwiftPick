import "./App.css";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SingUp from "./Components/SingUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ViewAllRequests from "./Components/ViewAllRequests";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/>} />
      <Route path="/auth/signup" element={<SingUp/>} />
      <Route path="/auth/login" element = {<Login/>} />
      <Route path="/auth/forgotPassword" element = {<ForgotPassword/>} />
      <Route path="/auth/resetPassword/:token" element = {<ResetPassword/>} />
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/requests" element = {<ViewAllRequests/>} />
      
    </Routes>
  )
}

export default App
