import React, { useState, useEffect } from "react";
import axios_instance from "../axios";

import "./Profile.css";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ViewMyRequests from "./ViewMyRequests";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from "@mui/material";

const drawerWidth = 240;

export default function Profile() {
  const navigate = useNavigate();

  let firstRender = true;
  const [user, setUser] = useState();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios_instance.get('/auth/verifyLogin', {
          withCredentials: true,
        });
        const data = res.data;
        setUser(data.user);
      } catch (error) {
        // Redirect user to login page if token verification fails
        navigate('/auth/login');
      }
    };

    const refreshToken = async () => {
      try {
        const res = await axios_instance.get('/auth/refresh', {
          withCredentials: true,
        });
        const data = res.data;
        setUser(data.user);
      } catch (error) {
        console.log("Error refreshing token:", error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    };

    // Initial token verification
    verifyToken();

    // Set up interval to refresh token every 9 minutes
    const interval = setInterval(refreshToken, 1000 * 60 * 60);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [navigate]); // Add navigate as a dependency

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Divider />
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/requests")}>
                <ListItemIcon>{<ListAltIcon />}</ListItemIcon>
                <ListItemText primary="All Requests" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/myRequests")}>
                <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                <ListItemText primary="My Requests" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/pendingRequests")}>
                <ListItemIcon>{<PendingActionsIcon />}</ListItemIcon>
                <ListItemText primary="Pending Requests" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/myHistory")}>
                <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
                <ListItemText primary="History" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={(event) => navigate("/profile")}
                style={{ backgroundColor: "#BED5EE" }}
              >
                <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCard>
            <div
              className="topbar rounded-top text-white d-flex flex-row"
              style={{ backgroundColor: "#000", height: "400px" }}
            >
              <div>
                <MDBTypography
                  className="username"
                  style={{ marginTop: "20px" }}
                >
                  {user?.username}
                </MDBTypography>
                <MDBCardText
                  className="hostel"
                  style={{ marginBottom: "20px" }}
                >
                  {user?.hostelName}
                </MDBCardText>
              </div>

              <div>
                {/* <Button
                  className="editbutton outlined"
                  style={{ marginRight: "20px", background: "white" }}
                >
                  Edit Profile
                </Button> */}
                {/* <MDBBtn
                  color="light"
                  rippleColor="dark"
                  style={{ height: "36px", overflow: "visible" }}
                  className="editbutton me-1"
                >
                  Edit profile
                </MDBBtn> */}
              </div>
            </div>
            <div
              className="p-4 text-black"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="detailsdiv">
                <div>
                  <div className=" px-3">
                    <MDBCardText className="small text-muted mb-0">
                      Email
                    </MDBCardText>
                    <MDBCardText className="requestdetails mb-1 h5">
                      {user?.email}
                    </MDBCardText>
                  </div>
                </div>
                <div className="requestdetailsdiv">
                  <div
                    className="detailscard px-3"
                    style={{
                      border: "2px solid black",
                      borderRadius: "10px",
                    }}
                  >
                    <MDBCardText className="requestdetails mb-1 h5">
                      {user?.totalRequests}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Requests
                    </MDBCardText>
                  </div>
                  <div
                    className="detailscard px-3"
                    style={{
                      border: "2px solid black",
                      borderRadius: "10px",
                    }}
                  >
                    <MDBCardText className="requestdetails mb-1 h5">
                      {user?.totalDeliveries}
                    </MDBCardText>
                    <MDBCardText className="small text-muted mb-0">
                      Deliveries
                    </MDBCardText>
                  </div>
                </div>
              </div>
            </div>
            <MDBCardBody className="text-black p-4">
              <div
                className="secondarydetails mb-5"
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "2px solid black",
                  borderRadius: "10px",
                }}
              >
                <div className="basicdetails p-4">
                  <MDBCardText className="font-italic mb-1">
                    <b>Gender:</b> {user?.gender}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-1">
                    <b>Room:</b> {user?.roomNumber}
                  </MDBCardText>
                  <MDBCardText className="font-italic mb-0">
                    <b>Phone Number:</b> {user?.phoneNumber}
                  </MDBCardText>
                </div>
                <div className="ratingdetails">
                  <div className="ratingdiv">
                    <Rating
                      readOnly
                      defaultValue={0.5}
                      precision={0.5}
                      value={user?.requesterRating}
                      style={{ padding: "20px" }}
                    />
                    <MDBCardText className="small text-muted mb-0">
                      Requester Rating
                    </MDBCardText>
                  </div>
                  <div className="ratingdiv">
                    <Rating
                      readOnly
                      defaultValue={0.5}
                      precision={0.5}
                      value={user?.requesteeRating}
                      style={{ padding: "20px" }}
                    />
                    <MDBCardText className="small text-muted mb-0">
                      Requestee Rating
                    </MDBCardText>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
