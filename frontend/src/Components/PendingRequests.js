import React, { useState, useEffect } from "react";
import PostNewRequest from "./PostNewRequest";
import axios_instance from "../axios";
import RequestCard from "./RequestCard";
import "./ViewMyHistory.css";
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

function PendingRequests() {
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
        console.log(response);
        setRequests(response.data.data);
      }

      return;
    }
    fetchRequests();
  }, [user]);

  return (
    <div className="PendingRequests">
      <div className="RequestCards">
        {!requests.length && (
          <span className="Nothing">Nothing to show here</span>
        )}
        {requests.data.map((request) => {
          return (
            <RequestCard
              className="RequestCardOuter"
              key={request._id}
              request={request}
            ></RequestCard>
          );
        })}
      </div>
    </div>
  );
}

export default PendingRequests;
