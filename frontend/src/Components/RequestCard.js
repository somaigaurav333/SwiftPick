import React from "react";
import "./RequestCard.css";

function RequestCard({ request }) {
  return (
    <div className="RequestCard">
      <div className="Head">
        <div className="Username">{request.UserName} </div>
        <div className="Phone">{request.Phone} </div>
      </div>
      <div className="DropLocation">{request.DropLocation}</div>
      <div className="Time"> {request.Time}</div>
    </div>
  );
}

export default RequestCard;
