import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import axios_instance from '../../axios';

import "./AdminCss.css"

import { BsGeoAltFill, BsPeopleFill, BsListCheck } from 'react-icons/bs';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const drawerWidth = 200;

const AdminDashboard = () => {
    let firstRender = true;
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [noOfUsers, setNoOfUsers] = useState(0);
    const [noOfLocs, setNoOfLocs] = useState(0);
    const [noOfReq, setNoOfReq] = useState(0);
    const [deliveryCount, setDeliveryCount] = useState([]);
    const [pickupCount, setPickupCount] = useState([]);
    const [pieColors1, setPieColors1] = useState([]);
    const [pieColors2, setPieColors2] = useState([]);
    const [dayWiseData, setDayWiseData] = useState([]);

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

    

    useEffect(() => {
        getCount();
        getLocCount();
        getDayWise();
    }, []);

    useEffect(() => {
        if (pickupCount.length > 0) {
            setPieColors1(generatePieColors(pickupCount));
        }
        if (deliveryCount.length > 0) {
            setPieColors2(generatePieColors(deliveryCount));
        }
        console.log(pieColors1);
    }, [pickupCount, deliveryCount]);

    const getCount = async () => {
        const res = await axios_instance.get('/stats/getCount').catch((err) => console.log(err))

        setNoOfUsers(res.data.userCount);
        setNoOfLocs(res.data.locCount);
        setNoOfReq(res.data.reqCount);
    };

    const getLocCount = async () => {
        const res1 = await axios_instance.get('/stats/noOfReqLoc/pickUpLoc').catch((err) => console.log(err));
        const res2 = await axios_instance.get('/stats/noOfReqLoc/deliveryLoc').catch((err) => console.log(err));

        setPickupCount(res1.data);
        setDeliveryCount(res2.data);
        console.log(deliveryCount)
    };

    const getDayWise = async () => {
        const dayWiseData = await axios_instance.get('/stats/getPerDayReqs').catch((err) => console.log(err));
        
        console.log(dayWiseData.data)
        setDayWiseData(dayWiseData.data);
    }

    const generatePieColors = (data) => {
        const colors = [];
        const step = 360 / data.length;
        for (let i = 0; i < data.length; i++) {
            const hue = step * i;
            colors.push(`hsl(${hue}, 70%, 50%)`);
        }
        return colors;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ position: "relative", zIndex: 1 }}>
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
            </Drawer>
            <main className='main-container'>
                <div className='main-title'>
                    <h1>DASHBOARD</h1>
                </div>

                <div className='main-cards'>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>LOCATIONS</h3>
                            <BsGeoAltFill className='card_icon' />
                        </div>
                        <h1>{noOfLocs}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>CUSTOMERS</h3>
                            <BsPeopleFill className='card_icon' />
                        </div>
                        <h1>{noOfUsers}</h1>
                    </div>
                    <div className='card'>
                        <div className='card-inner'>
                            <h3>REQUESTS</h3>
                            <BsListCheck className='card_icon' />
                        </div>
                        <h1>{noOfReq}</h1>
                    </div>
                </div>

                <div className='charts'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={dayWiseData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Total Requests" stroke="#82ca9d" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Completed Requests" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <div className='pie-charts'>
                            <div className='pie-chart'>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={pickupCount}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="pickupLocation"
                                    >
                                        {pickupCount.map((entry, index) => (
                                            <Cell key={`pickup-cell-${index}`} fill={pieColors1[index % pieColors1.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                                <div className='chart-title'>
                                    Popularity of Pickup Locations 
                                </div>
                            </div>
                            <div className='pie-chart'>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={deliveryCount}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="deliveryLocation"
                                    >
                                        {deliveryCount.map((entry, index) => (
                                            <Cell key={`delivery-cell-${index}`} fill={pieColors2[index % pieColors2.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                                <div className='chart-title'>
                                    Popularity of Delivery Locations
                                </div>
                            </div>
                        </div>
                    </ResponsiveContainer>
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard;
