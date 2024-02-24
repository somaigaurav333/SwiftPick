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
      {request.items.map((item) => {
        return (
          <div className="Items" key={item}>
            {item}
          </div>
        );
      })}

      <div className="Time"> {request.createdAt}</div>
    </div>
  );
}

export default RequestCard;
