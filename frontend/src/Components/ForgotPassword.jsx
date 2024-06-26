import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import axios_instance from '../axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios_instance.post('/auth/forgotPassword', {
            email,
        }).then(response => {
          if(response.data.status){
            alert("Check Your email for reset password link");
            navigate('/auth/login');
          }
          else{
            navigate('/auth/signup')
          }
          console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col p-4">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-8 text-3xl text-center">Forgot Password</h2>
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="block border border-grey-light w-full p-3 rounded mb-4"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="w-full text-center py-3 rounded text-balck focus:outline-none my-1 border border-black hover:bg-gray-900 text hover:text-white"
            type="submit"
          >
            Send
          </button>
        </form>
        <div className="text-grey-dark mt-6">
          Already have an account?&nbsp;
          <Link
            className="no-underline border-b border-blue text-blue"
            to={"/auth/login"}
            style={{ color: "blue" }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword