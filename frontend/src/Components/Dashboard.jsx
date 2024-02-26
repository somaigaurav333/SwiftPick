import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000/auth/verifyLogin',{
      withCredentials: true
    }).then(res => {
      if (!(res.data.status)) {
        navigate('/auth/login')
      }
    }).catch(error => {
        console.log(error);
    })
      
  });

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard