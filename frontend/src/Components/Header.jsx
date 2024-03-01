import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';
axios.defaults.withCredentials = true;
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post(
      'http://localhost:5000/auth/userLogout',
      null,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      return res;
    }
    return new Error('Unable TO Logout. Please try again');
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState(0);

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h3'>SwiftPick</Typography>
        <Box sx={{ marginLeft: 'auto' }}>
          <Tabs
            indicatorColor='secondary'
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor='inherit'
          >
            {!isLoggedIn && (
              <Tab to='/auth/login' LinkComponent={Link} label='Login' />
            )}
            {!isLoggedIn && (
              <Tab to='/auth/signup' LinkComponent={Link} label='Signup' />
            )}
            {isLoggedIn && (
              <Tab
                onClick={handleLogout}
                to='/'
                LinkComponent={Link}
                label='Logout'
              />
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
