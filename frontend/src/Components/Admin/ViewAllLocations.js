import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130 },
//   { field: 'lastName', headerName: 'Last name', width: 130 },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

//fetching data

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

const ViewAllLocations = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newLocation, setNewLocation] = useState({
    location: '',
    coordinate: '',
  });

  const columns = [
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
  const handleSubmit = () => {
    // Perform logic to add new location to the database
    // For example, send a POST request to your backend API
    fetch('http://localhost:5000/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add location');
        }
        // Refresh data after successfully adding the location
        fetchData();
        handleClose();
      })
      .catch((error) => {
        console.error('Error adding location:', error);
      });
  };

  // useEffect(()=>{
  //     fetch('http://localhost:5000/locations')
  //     .then(resp=>resp.json())
  //     // .then(resp=>console.log(resp.data))
  //     .then(resp=>setData(resp.data))
  // },[])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/locations')
      .then((resp) => resp.json())
      // .then(resp=>console.log(resp.data))
      .then((resp) => setData(resp.data));
  };

  return (
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
      style={{ position: 'absolute', top: 0, right: 0 }}
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
      <div style={{ margin: '50px auto', maxWidth: '800px' }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
      </div>
    </div>
  );
};

export default ViewAllLocations;
