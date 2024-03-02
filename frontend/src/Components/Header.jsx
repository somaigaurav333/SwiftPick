import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../store';
import axios_instance from '../axios';


axios_instance.defaults.withCredentials = true;
const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios_instance.post(
      '/auth/userLogout',
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

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h3'>SwiftPick</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs
              textColor='whitespace'
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
      <Toolbar/>
    </div>
  );
};

export default Header;
