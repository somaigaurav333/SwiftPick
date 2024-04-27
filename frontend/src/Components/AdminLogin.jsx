import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import axios_instance from "../axios";


const AdminLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);

  const navigate = useNavigate();

  axios_instance.defaults.withCredentials = true;
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/requests');
      }
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const sendLoginReq = async () => {
  try {
    const response = await axios_instance.post("/auth/login", {
      email,
      password,
    });

    if (response.status === 200) {
      const userData = response.data; // Assuming the response contains user data
      console.log(userData);
      dispatch(authActions.login({
        isLoggedIn: true,
        isAdmin: userData.user.isAdmin, // Assuming isAdmin is returned from the API response
        userId: userData.user._id // Assuming userId is returned from the API response
      }));
      navigate("/requests");
    } else {
      alert("Error Occurred");
    }
  } catch (error) {
    console.error("Login error:", error);
    window.location.reload();
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginReq()
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col p-4">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-8 text-3xl text-center">Admin Login</h2>
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* <label htmlFor="password">Password</label> */}
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full text-center py-3 rounded text-balck focus:outline-none my-1 border border-black hover:bg-gray-900 text hover:text-white"
            type="submit"
          >
            Login
          </button>
          <div className="bg-grey-lighter flex p-4 items-center justify-center">
            <Link
              className="no-underline border-b border-blue "
              to={"/auth/forgotPassword"}
              style={{ color: "blue" }}
            >
              Forgot Password?
            </Link>
          </div>
          <div className="white-space:break-space bg-grey-lighter flex p-4 items-center justify-center">
            <Link
              className="no-underline border-b border-blue "
              to={"/auth/login"}
              style={{ color: "blue" }}
            >
              User Login
            </Link>
          </div>
        </form>
        <div className="text-grey-dark mt-6">
          Don't have an Account?&nbsp;
          <Link
            className="no-underline border-b border-blue text-blue"
            to={"/auth/signup"}
            style={{ color: "blue" }}
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;