import React, { useState, useEffect } from "react";
import PostNewRequest from "./PostNewRequest";
import axios_instance from "../axios";
import RequestCard from "./RequestCard";
import "./ViewMyRequests.css";

// const myid = "65db1ae2405593688c4f6cfe";
const myid = "";
const requestsURL = "/requests/" + myid;

function ViewMyRequests() {
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

  return (
    <div className="ViewMyRequests">
      <div className="RequestCards">
        {requests.map((request) => {
          return (
            <RequestCard
              className="RequestCardOuter"
              key={request._id}
              request={request}
            ></RequestCard>
          );
        })}
      </div>
      <div className="PostNewRequest">
        <PostNewRequest />
      </div>
    </div>
  );
}

export default ViewMyRequests;
