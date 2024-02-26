import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  
  return (
    <div>Home<br/>
      <button className='p-2 m-2 border border-black'><Link to="/dashboard">Dashboard</Link></button>
      <button className='p-2 m-2 border border-black' >Logout</button>
    </div>
  )
}

export default Home