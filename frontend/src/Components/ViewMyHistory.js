import React, { useState, useEffect } from "react";
import axios_instance from "../axios";
import "./ViewMyHistory.css";
import MyRequestCard from "./MyRequestCard";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function ViewMyHistory() {
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
        const response = await axios_instance.get(
          "/requests/delivered/" + user._id
        );
        console.log(response);
        setRequests(response.data.data);
      }

      return;
    }
    fetchRequests();
  }, [user]);

  return (
    <div className="ViewMyHistory">
      <h1>Your History</h1>
      <div className="RequestCards">
        {!requests.length && (
          <span className="Nothing">Nothing to show here</span>
        )}
        {requests.map((request) => {
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
        })}
      </div>
    </div>
  );
}

export default ViewMyHistory;
