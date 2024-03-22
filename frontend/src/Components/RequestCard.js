import React from "react";
import "./RequestCard.css";
import axios_instance from "../axios";
import { Button } from "@mui/material";

function RequestCard({ request, user }) {
  const handleAcceptRequest = async () => {
    console.log(user);
    console.log(request);
    console.log(
      "http://localhost:5000" +
        "/requests/accept/" +
        request._id +
        "/" +
        user._id
    );
    await axios_instance.post(
      "/requests/accept/" + request._id + "/" + user._id
    );
  };

  return (
    // <div className=" RequestCard shadow-md">
    //   <div className="Head">
    //     <div className="Username">{request.requesterUsername} </div>
    //     <div className="Phone">{request.phoneNumber} </div>
    //   </div>
    //   <div className="DropLocation">{request.deliveryLocation}</div>
    //   {request.items.map((item) => {
    //     return (
    //       <div className="Items" key={item}>
    //         {item}
    //       </div>
    //     );
    //   })}
    //   <div className="Footer">
    //     <div className="Date">{request.date}</div>
    //     <div className="Time">{request.time}</div>
    //   </div>
    // </div>

    // <div className="card mb-3 shadow-md RequestCard" styles="max-width: 18rem;">
    //   <div className="card-header">
    //     <div className="Head">
    //       <div className="Username">{request.requesterUsername} Agrawal</div>
    //       <div className="Phone">{request.phoneNumber} </div>
    //     </div>
    //     <div className="DropLocation">To: {request.deliveryLocation}</div>
    //   </div>
    //   <div className="card-body">
    //     <p className="card-text">
    //       {request.items.map((item) => {
    //         return (
    //           <div className="Items" key={item}>
    //             {item}
    //           </div>
    //         );
    //       })}
    //     </p>
    //   </div>
    //   <div className="Footer">
    //     <div className="Date">{request.date}</div>
    //     <div className="Time"> {request.time} </div>
    //   </div>
    // </div>

    <span
      href="#"
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 RequestCard"
    >
      <div className="Head">
        <div className="Username">{request.requesterUsername}</div>
        <div className="Phone">{request.phoneNumber} </div>
      </div>
      <div className="DropLocation">To: {request.deliveryLocation}</div>
      <div className="card-body">
        <p className="card-text">
          {request.items.map((item) => {
            return (
              <div className="Items" key={item}>
                {item}
              </div>
            );
          })}
        </p>
      </div>
      <div className="Footer" style={{ marginTop: "auto" }}>
        <div className="Date">{request.date}</div>
        <div className="Time"> {request.time} </div>
      </div>
      <div>
        <Button onClick={handleAcceptRequest}>Accept</Button>
      </div>
    </span>
  );
}

export default RequestCard;
