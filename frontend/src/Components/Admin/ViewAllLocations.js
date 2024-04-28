import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useNavigate } from 'react-router-dom'
import axios_instance from '../../axios';

const drawerWidth = 200;

const ViewAllLocations = () => {
  let firstRender = true;
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Function to verify token
    const verifyToken = async () => {
        try {
            // Verify admin login
            const res = await axios_instance.get('/auth/verifyAdminLogin', {
                withCredentials: true,
            });
            const data = res.data;
            setUser(data.user);
        } catch (error) {
            // Handle error, e.g., redirect user to login page
            navigate('/auth/login'); // Assuming '/login' is the login page
        }
    };

    // Function to refresh token
    const refreshToken = async () => {
        try {
            // Refresh token
            const res = await axios_instance.get('/auth/refreshAdmin', {
                withCredentials: true,
            });
            const data = res.data;
            setUser(data.user);
        } catch (error) {
            console.log(error); // Handle error appropriately
        }
    };

    verifyToken(); // Call verifyToken initially

    // Set up interval to refresh token every 9 minutes
    const interval = setInterval(refreshToken, 1000 * 60 * 9);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
}, [navigate]); // Add navigate as a dependency

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newLocation, setNewLocation] = useState({
    location: '',
    coordinate: '',
  });

  const onButtonClick = async (e, row) => {
    e.stopPropagation();
    try {
      const response = await axios_instance.delete(`/admin/location/${row._id}`);
      if (response.status !== 200) {
        throw new Error('Failed to delete location');
      }
      console.log('Location deleted successfully');
    } catch (error) {
      console.error('Error deleting location:', error.message);
    }
    fetchData();
  };

  const locationsColumn = [
    {
      field: '_id',
      headerName: 'ID',
      width: 210,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'location',
      headerName: 'Location name',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'coordinate',
      headerName: 'Coordinates',
      width: 200,
      align: 'right',
      headerAlign: 'right',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant='contained'
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      const response = await axios_instance.post('/admin/locations', newLocation, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to add location');
      }
      // Refresh data after successfully adding the location
      fetchData();
      handleClose();
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios_instance.get('/admin/locations');
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
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/admin/dashboard")}>
                <ListItemIcon>
                  <SpaceDashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/admin/locations")}>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Locations" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/admin/users")}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>{' '}

      {/* Main Rendering of the Table begins here */}
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
          <Button
            variant='outlined'
            onClick={handleClickOpen}
            style={{ position: 'absolute', top: 0, right: 0, marginTop: 10 }}
          >
            Add Location
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Location</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the details for the new location:
              </DialogContentText>
              <TextField
                autoFocus
                margin='dense'
                id='location'
                name='location'
                label='Location Name'
                type='text'
                fullWidth
                variant='standard'
                value={newLocation.location}
                onChange={handleChange}
              />
              <TextField
                margin='dense'
                id='coordinate'
                name='coordinate'
                label='Coordinates'
                type='text'
                fullWidth
                variant='standard'
                value={newLocation.coordinate}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
          </Dialog>
          <div style={{ margin: '50px auto', maxWidth: '1000px', height: 400 }}>
            <DataGrid
              getRowId={(row) => row._id}
              rows={data}
              columns={locationsColumn}
              hideFooter={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllLocations;
