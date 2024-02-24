import React from "react";
import "./RequestCard.css";

function RequestCard({ request }) {
  return (
    <div className="RequestCard">
      <div className="Head">
        <div className="Username">{request.name} </div>
        <div className="Phone">{request.phoneNumber} </div>
      </div>
      <div className="DropLocation">{request.deliveryLocation}</div>
      <div className="Items">{request.items}</div>
      <div className="Time"> {request.createdAt}</div>
    </div>
  );
}

export default RequestCard;
