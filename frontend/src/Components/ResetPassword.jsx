import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {token} = useParams();
    const navigate = useNavigate();

    // axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/auth/resetPassword/${token}`, {
            password,
        }).then(response => {
            if(response.data.status){
                alert("Password Change Successful");
            }else{
                alert("Session Time out");
            }
            navigate('/auth/login')
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='bg-grey-lighter min-h-screen flex flex-col p-4'>
            <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 '>
                <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full' onSubmit={handleSubmit}>
                    <h2 className='mb-8 text-3xl text-center'>Reset Password</h2>

                    {/* <label className="p-2" type="password">New Password</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="password" placeholder='New Password'
                        onChange={(e) => setPassword(e.target.value)} />

                    <button 
                        className='w-full text-center py-3 rounded text-balck focus:outline-none my-1 border border-black hover:bg-gray-900 text hover:text-white' 
                        type='submit'>Reset</button>
                    <div className="bg-grey-lighter flex p-4 items-center justify-center">
                      <Link className='no-underline border-b border-blue ' to={'/auth/forgot-password'}>Forgot Password?</Link>
                    </div>
                </form>
                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link className='no-underline border-b border-blue text-blue' to={'/auth/login'}>Login</Link>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword;