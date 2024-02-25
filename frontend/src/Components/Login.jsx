import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/auth/login', {
            email,
            password,
        }).then(response => {
            if(response.data.status){
                navigate('/');
            }else{
            }
        }).catch(err => {
            console.log(err.response.data);
        })
    }

    return (
        <div className='bg-grey-lighter min-h-screen flex flex-col p-4'>
            <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 '>
                <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full' onSubmit={handleSubmit}>
                    <h2 className='mb-8 text-3xl text-center'>Login</h2>
                    {/* <label htmlFor="email">Email</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="text" placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)} />

                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="password" placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} />

                    <button 
                        className='w-full text-center py-3 rounded text-balck focus:outline-none my-1 border-black' 
                        type='submit'>Login</button>
                </form>
                <div className="text-grey-dark mt-6">
                    Don't have an Account?
                    <Link className='no-underline border-b border-blue text-blue' to={'/auth/signup'}>SignUp</Link>
                </div>
            </div>
        </div>

    )
}

export default Login;