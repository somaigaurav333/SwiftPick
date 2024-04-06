import React, { useState, useEffect } from "react";
import RequestCard from "./RequestCard";
import "./ViewMyRequestsRow.css";

function ViewMyRequestsRow({ title, requests, pickupLocation, user }) {
  //Filter requests based on pickup location
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    setFilteredRequests([]);
    requests.forEach((request) => {
      if (request.status === title) {
        setFilteredRequests((oldArray) => [...oldArray, request]);
      }
    });
  }, [requests, pickupLocation]);

  return (
    <div>
      {filteredRequests.length > 0 && (
        <div className="ViewAllReqRow">
          <h2>{title}</h2>
          <div className="RequestCards">
            {filteredRequests.map((request) => {
              return (
                <RequestCard
                  className="RequestCardOuter"
                  key={request._id}
                  request={request}
                  user={user}
                  showAccept={true}
                  showCollect={false}
                  showDelete={false}
                ></RequestCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMyRequestsRow;
