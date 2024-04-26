import React, { useState, useEffect } from "react";
import PostNewRequest from "./PostNewRequest";
import axios_instance from "../axios";
import RequestCard from "./RequestCard";
import "./PendingRequests.css";
import ViewAllRequestsRow from "./ViewAllRequestsRow";
import axios from "axios";
import MyRequestCard from "./MyRequestCard";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const pickupLocationsURL = "/admin/locations";

function PendingRequests() {
  //fetch pickup locations data
  const [pickupLocations, setpickupLocations] = useState([]);
  const navigate = useNavigate();
  let firstRender = true;
  const [user, setUser] = useState();
  //fetch requests data
  const [requests, setRequests] = useState([]);

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

  useEffect(() => {
    async function fetchRequests() {
      if (user) {
        const response = await axios_instance.get(
          "/requests/pending/" + user._id
        );
        setRequests(response.data.data);
      }

      return;
    }
    fetchRequests();
  }, [user]);

  useEffect(() => {
    async function fetchPickUpLocations() {
      const response = await axios_instance.get(pickupLocationsURL);
      setpickupLocations(response.data.data);
      return;
    }
    fetchPickUpLocations();
  }, []);

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
        <Box sx={{ overflow: "auto" }} className="custombox">
          <List className="customlist">
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
              <ListItemButton
                onClick={(event) => navigate("/pendingRequests")}
                style={{ backgroundColor: "#BED5EE" }}
              >
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

      <div className="PendingRequests">
        <h1 className="PendingRequestsHeading">Pending Requests</h1>
        <div className="RequestCards">
          {!requests.length && (
            <span className="Nothing">Nothing to show here</span>
          )}
          {/* {requests.map((request) => {
            let pc = pickupLocations.find((place) => {
              // console.log(typeof place.location);
              // console.log(typeof request.pickupLocation);
              if (place.location === request.pickupLocation) {
                // console.log(place.coordinate);

                // console.log(typeof place.coordinate);
                return true;
              }
            });
            let dc = pickupLocations.find((place) => {
              // console.log(typeof place.location);
              // console.log(typeof request.pickupLocation);
              if (place.location === request.deliveryLocation) {
                // console.log(place.coordinate);

                // console.log(typeof place.coordinate);
                return true;
              }
            });

            // console.log(typeof pc);
            return (
              <RequestCard
                className="RequestCardOuter"
                key={request._id}
                request={request}
                showAccept={false}
                showCollect={true}
                showDelete={false}
                pickupCoordinates={pc?.coordinate}
                deliveryCoordinates={dc?.coordinate}
              ></RequestCard>
            );
          })} */}
          {["ACCEPTED", "COLLECTED", "DELIVERED"].map((status) => {
            return (
              <ViewAllRequestsRow
                key={status}
                title={status}
                requests={requests}
                pickupLocation={status}
                user={user}
                pending={1}
              ></ViewAllRequestsRow>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PendingRequests;
