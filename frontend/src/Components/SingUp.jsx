import React, { useState } from 'react'
import axios from 'axios';

function SingUp() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [hostelName, setHostelName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/auth/signup', {
            username,
            email,
            password,
            roomNumber,
            hostelName,
            gender,
            phoneNumber
        }).then(response => {
            console.log(response);
        }).catch(err =>{
            console.log(err);
        })
    }

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>SignUp</h2>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='Username'
                    onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input type="text" placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="roomNumber">Room Number</label>
                <input type="text" placeholder='Room Number'
                    onChange={(e) => setRoomNumber(e.target.value)} />

                <label htmlFor="hostelName">Hostel Name</label>
                <input type="text" placeholder='Hostel Name'
                    onChange={(e) => setHostelName(e.target.value)} />

                <label htmlFor="gender">Gender</label>
                <input type="text" placeholder='Gender'
                    onChange={(e) => setGender(e.target.value)} />

                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" placeholder='Phone Number'
                    onChange={(e) => setPhoneNumber(e.target.value)} />

                <button type='submit'>SignUp</button>
            </form>
        </div>
    )
}

export default SingUp