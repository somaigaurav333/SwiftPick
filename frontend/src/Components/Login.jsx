import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import axios_instance from "../axios";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios_instance.defaults.withCredentials = true;

  const sendLoginReq = async () => {
    const res = axios_instance
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status == 200) {
          navigate("/requests");
          dispatch(authActions.login());
        } else {
          alert("Error Occurred");
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
        window.location.reload();
      });
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginReq();
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col p-4">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-8 text-3xl text-center">Login</h2>
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
              className="no-underline border-b border-blue"
              to={"/auth/adminLogin    "}
              style={{ color: "blue" }}
            >
              Login as Admin?
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
};

export default Login;
