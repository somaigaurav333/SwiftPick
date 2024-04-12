import React, { useState, useEffect } from "react";
import axios_instance from "../axios";
import "./ViewMyRequests.css";
import ViewMyRequestsRow from "./ViewMyRequestsRow";
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

const drawerWidth = 240;

function ViewMyRequests() {
  const navigate = useNavigate();
  let firstRender = true;
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();

  const refreshToken = async () => {
    const res = await axios_instance
      .get("/auth/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const sendReq = async () => {
    const res = await axios_instance
      .get("/auth/verifyLogin", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendReq().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 60 * 9);

    return () => clearInterval(interval);
  }, []);

  //fetch requests data
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      if (user) {
        const response = await axios_instance.get("/requests/open/" + user._id);
        console.log(response);
        setRequests(response.data.data);
      }

      return;
    }
    fetchRequests();
  }, [user]);

  const handleDelete = async (id) => {
    const res = await axios_instance
      .delete("/requests/" + id, {
        withCredentials: false,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

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
              <ListItemButton
                onClick={(event) => navigate("/myRequests")}
                style={{ backgroundColor: "#BED5EE" }}
              >
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
          </List>
        </Box>
      </Drawer>
      <div className="ViewMyRequests">
        <div className="RequestCards">
          {!requests.length && (
            <span className="Nothing">Nothing to show here</span>
          )}
          {["OPEN", "ACCEPTED", "COLLECTED"].map((status) => {
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

export default ViewMyRequests;
