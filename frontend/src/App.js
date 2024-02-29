import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SingUp from "./Components/SingUp";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ViewAllRequests from "./Components/ViewAllRequests";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";
import AdminLogin from "./Components/AdminLogin"
import ViewAllLocations from "./Components/Admin/ViewAllLocations";
import PostNewRequest from "./Components/PostNewRequest";


const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Login/>} />
      <Route path="/auth/signup" element={<SingUp/>} />
      <Route path="/auth/login" element = {<Login/>} />
      <Route path="/auth/adminLogin" element = {<AdminLogin/>} />
      <Route path="/auth/forgotPassword" element = {<ForgotPassword/>} />
      <Route path="/auth/resetPassword/:token" element = {<ResetPassword/>} />
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/requests" element = {<ViewAllRequests/>} />
      <Route path="/admin/locations" element = {<ViewAllLocations/>} />
    </Routes>
  );
};

export default App;
