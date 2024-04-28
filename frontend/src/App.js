import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SingUp from "./Components/SingUp";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import ViewAllRequests from "./Components/ViewAllRequests";
import ResetPassword from "./Components/ResetPassword";
import SignupVerify from "./Components/SignupVerify";
import Dashboard from "./Components/Dashboard";
import AdminLogin from "./Components/AdminLogin";
import ViewAllLocations from "./Components/Admin/ViewAllLocations";
import ViewAllUsers from "./Components/Admin/ViewAllUsers";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ViewMyRequests from "./Components/ViewMyRequests";
import ViewMyHistory from "./Components/ViewMyHistory";
import Profile from "./Components/Profile";
import { useSelector } from "react-redux";
import Header from "./Components/Header";
import PendingRequests from "./Components/PendingRequests";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/signup" element={<SingUp />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/adminLogin" element={<AdminLogin />} />
          <Route path="/auth/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/auth/resetPassword/:token"
            element={<ResetPassword />}
          />
          <Route path="/auth/verifySignup/:token" element={<SignupVerify />} />
          {isLoggedIn && !isAdmin && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {isLoggedIn && !isAdmin && (
            <Route path="/requests" element={<ViewAllRequests />} />
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/admin/locations" element={<ViewAllLocations />} />
          )}
          {isLoggedIn && isAdmin && (
            <Route path="/admin/users" element={<ViewAllUsers />} />
          )}
          {isLoggedIn && !isAdmin && (
            <Route path="/myRequests" element={<ViewMyRequests />} />
          )}
          {isLoggedIn && !isAdmin && (
            <Route path="/myHistory" element={<ViewMyHistory />} />
          )}
          {isLoggedIn && !isAdmin && (
            <Route path="/pendingRequests" element={<PendingRequests />} />
          )}
          {isLoggedIn && !isAdmin && (
            <Route path="/profile" element={<Profile />} />
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
