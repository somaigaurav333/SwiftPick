import React, { useEffect, useState } from 'react';
import axios from 'axios';

let firstRender = true;

const Dashboard = () => {
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/auth/refresh", {
      withCredentials: true
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  }

  const sendReq = async () => {
    const res = await axios.get('http://localhost:5000/auth/verifyLogin', {
      withCredentials: true
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendReq().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then(data => setUser(data.user))
    }, 1000 * 28)

    return () => clearInterval(interval)
  }, [])

  return <div>
    {user && <h1>Welcome {user.username}</h1>}
  </div>
}

export default Dashboard