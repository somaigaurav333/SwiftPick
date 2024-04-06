import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios_instance from '../../axios';

const drawerWidth = 240;

const ViewAllUsers = () => {
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios_instance
      .get('/auth/refreshAdmin', {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const sendReq = async () => {
    const res = await axios_instance
      .get('/auth/verifyAdminLogin', {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    let firstRender = true;
    if (firstRender) {
      firstRender = false;
      sendReq().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 60 * 9);

    return () => clearInterval(interval);
  }, []);

  const [data, setData] = useState([]);

  const onButtonClickDelete = async (e, row) => {
    e.stopPropagation();
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) {
      return; // If user cancels, do nothing
    }
    try {
      const response = await axios_instance.delete(`/admin/userDelete/${row._id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete User');
      }
      // Assuming you want to remove the row from the UI after successful deletion
      // You would need to implement this logic in your application
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting User:', error.message);
    }
    fetchData(); // Fetch data after deletion
  };


  const onButtonClickValidate = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios_instance.post(`/admin/userValidate/${row._id}`);
      if (response.status !== 200) {
        throw new Error('Failed to Validate User');
      }
      // Assuming you want to remove the row from the UI after successful deletion
      // You would need to implement this logic in your application
      console.log('User Validated successfully');
    } catch (error) {
      console.error('Error Validatin User:', error.message);
    }
    fetchData();
  };

  const onButtonClickStrike = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios_instance.post(`/admin/userStrike/${row._id}`);
      if (response.status !== 200) {
        throw new Error('Failed to Strike User');
      }
      // Assuming you want to remove the row from the UI after successful deletion
      // You would need to implement this logic in your application
      console.log('User Striked successfully');
    } catch (error) {
      console.error('Error Striking User:', error.message);
    }
    fetchData();
  };

  const columns = [
    {
      field: 'username',
      headerName: 'username',
      width: 210,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'isVerified',
      headerName: 'Verfication',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'requesterRating',
      headerName: 'Requester Rating',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'requesteeRating',
      headerName: 'Requestee Rating',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    // {
    //   field: 'totalRequests',
    //   headerName: 'Total Req',
    //   width: 200,
    //   align: 'right',
    //   headerAlign: 'right',
    // },
    // {
    //   field: 'totalDeliveries',
    //   headerName: 'Total Deliveries',
    //   width: 200,
    //   align: 'right',
    //   headerAlign: 'right',
    // },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      align: 'right',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div>
            {/* <Button
              onClick={(e) => onButtonClickValidate(e, params.row)}
              variant='contained'
              style={{ marginRight: '8px', backgroundColor: '#4CAF50', color: 'white' }}
            >
              Validate
            </Button>
            <Button
              onClick={(e) => onButtonClickStrike(e, params.row)}
              variant='contained'
              style={{ marginRight: '8px', backgroundColor: '#FDC364', color: 'white' }}
            >
              Strike
            </Button> */}
            <Button
              onClick={(e) => onButtonClickDelete(e, params.row)}
              variant='contained'
              style={{ backgroundColor: '#f44336', color: 'white' }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios_instance.get('/admin/getAllUsers');
      // response = response.json();
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Locations'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LocationOnIcon />
                    {/* {index % 2 === 0 ? <LocationOnIcon /> : <PeopleAltIcon />} */}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>{' '}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div style={{ position: 'relative', maxWidth: '800px', width: '100%' }}>
          {/* Button positioned at the top right corner */}
          <div style={{ margin: '50px auto', maxWidth: '800px', height: 400 }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={data}
              columns={columns}
              // initialState={{
              //   pagination: {
              //     paginationModel: { page: 0, pageSize: 5 },
              //   },
              // }}
              // pageSizeOptions={[5, 10]}
              // checkboxSelection

              hideFooter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUsers;