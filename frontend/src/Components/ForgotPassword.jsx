import React from 'react'

function ForgotPassword() {
  return (
    <div className='bg-grey-lighter min-h-screen flex flex-col p-4'>
            <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 '>
                <form className='bg-white px-6 py-8 rounded shadow-md text-black w-full' onSubmit={handleSubmit}>
                    <h2 className='mb-8 text-3xl text-center'>SignUp</h2>
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

                    {/* <label htmlFor="roomNumber">Room Number</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="text" placeholder='Room Number'
                        onChange={(e) => setRoomNumber(e.target.value)} />

                    {/* <label htmlFor="hostelName">Hostel Name</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="text" placeholder='Hostel Name'
                        onChange={(e) => setHostelName(e.target.value)} />

                    {/* <label htmlFor="gender">Gender</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="text" placeholder='Gender'
                        onChange={(e) => setGender(e.target.value)} />

                    {/* <label htmlFor="phoneNumber">Phone Number</label> */}
                    <input
                        className='block border border-grey-light w-full p-3 rounded mb-4'
                        type="text" placeholder='Phone Number'
                        onChange={(e) => setPhoneNumber(e.target.value)} />

                    <button 
                        className='w-full text-center py-3 rounded text-balck focus:outline-none my-1 border-black' 
                        type='submit'>SignUp</button>
                </form>
                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link className='no-underline border-b border-blue text-blue' to={'/auth/login'}>Login</Link>
                </div>
            </div>
        </div>
  )
}

export default ForgotPassword