import React, { useState, useEffect } from "react";
import ViewAllRequestsRow from "./ViewAllRequestsRow";
import PostNewRequest from "./PostNewRequest";
import axios_instance from "../axios";
import axios from "axios";
import "./ViewAllRequests.css";
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
import ViewMyRequests from "./ViewMyRequests";
import { useNavigate } from "react-router-dom";

const requestsURL = "/requests/open";
const pickupLocationsURL = "/locations";
const drawerWidth = 240;

function ViewAllRequests() {
  const navigate = useNavigate();

  let firstRender = true;
  const [user, setUser] = useState();

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
      const response = await axios_instance.get(requestsURL);
      setRequests(response.data.data);
      return;
    }
    fetchRequests();
  }, []);

  //fetch pickup locations data
  const [pickupLocations, setpickupLocations] = useState([]);

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
      <div className="ViewAllRequests">
        {pickupLocations.map((pickupLocation) => {
          return (
            <ViewAllRequestsRow
              key={pickupLocation.location}
              title={pickupLocation.location}
              requests={requests}
              pickupLocation={pickupLocation}
              user={user}
            ></ViewAllRequestsRow>
          );
        })}
      </div>
      <div className="PostNewRequest">
        <PostNewRequest />
      </div>
    </div>
  );
}

export default ViewAllRequests;
