import React, { useState, useEffect } from "react";
import axios_instance from "../axios";
import "./ViewMyHistory.css";
import ViewMyRequestsRow from "./ViewMyRequestsRow";
import MyRequestCard from "./MyRequestCard";
import { useNavigate } from "react-router-dom";
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
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

const drawerWidth = 240;

function ViewMyHistory() {
  const navigate = useNavigate();
  let firstRender = true;
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();

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

  //fetch requests data
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log("user:", user);
    async function fetchRequests() {
      if (user) {
        console.log("first");
        const response = await axios_instance.get(
          "/requests/history/" + user._id
        );
        console.log(response);
        setRequests(response.data.data);
      } else {
        console.log("second");
      }

      return;
    }

    fetchRequests();
  }, [user]);

  return (
    <div className="bgvir">
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
              <ListItemButton
                onClick={(event) => navigate("/myHistory")}
                style={{ backgroundColor: "#BED5EE" }}
              >
                <ListItemIcon>{<HistoryIcon />}</ListItemIcon>
                <ListItemText primary="History" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => navigate("/profile")}>
                <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <div className="ViewMyHistory">
        <h1 className="YourHistory">Your History</h1>
        <div className="HistoryRequestCards">
          {!requests.length && (
            <span className="Nothing">Nothing to show here</span>
          )}
          {/* {requests.map((request) => {
            return (
              <MyRequestCard
                className="RequestCardOuter"
                key={request._id}
                request={request}
                showAccept={false}
                showCollect={false}
                showDelete={false}
                showClose={false}
              ></MyRequestCard>
            );
          })} */}
          {["CLOSED"].map((status) => {
            return (
              <div>
                <ViewMyRequestsRow
                  key={status}
                  title={status}
                  requests={requests}
                  pickupLocation={status}
                  user={user}
                ></ViewMyRequestsRow>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewMyHistory;
