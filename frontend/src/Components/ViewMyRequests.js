import React, { useState, useEffect } from "react";
import axios_instance from "../axios";
import "./ViewMyRequests.css";
import ViewMyRequestsRow from "./ViewMyRequestsRow";
import { useNavigate } from "react-router-dom";

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
            <br/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewMyRequests;
