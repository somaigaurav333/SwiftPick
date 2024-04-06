import React from "react";
import "./MyRequestCard.css";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";

function RequestCard({ request, showAccept, showCollect, showDelete }) {
  const [showRequestDescription, setShowRequestDescription] = useState(false);
  const handleClose = () => {
    setShowRequestDescription(false);
  };

  const handleAcceptRequest = async () => {
    // const response = await axios_instance
    //   .post("/requests/accept/" + request._id + "/" + user._id)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status == 200) {
    //       alert("Request Accepted Successfully");
    //     } else {
    //       alert("Could not accept request");
    //     }
    //   });
  };
  const handleCollect = async () => {
    console.log(request);
    // const response = await axios_instance
    //   .post("/requests/accept/" + request._id + "/" + user._id)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status == 200) {
    //       alert("Request Accepted Successfully");
    //     } else {
    //       alert("Could not accept request");
    //     }
    //   });
  };
  return (
    <span>
      <Dialog
        open={showRequestDescription}
        onClose={handleClose}
        className="RequestDescriptionDialog"
      >
        <DialogTitle className="RequestDescriptionDialogTitle">
          Request Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="RequestDescriptionDialogText">
            <div className="RequestDescriptionDialogText">
              Requester: {request.requesterUsername}
            </div>
            {showAccept && (
              <div className="RequestDescriptionDialogText">
                Requester Phone: {request.phoneNumber}
              </div>
            )}
            <div className="RequestDescriptionDialogText">
              Date: {request.date}
            </div>
            <div className="RequestDescriptionDialogText">
              Time: {request.time}
            </div>
            <div className="RequestDescriptionDialogText">
              Pickp Location: {request.pickupLocation}
            </div>
            <div className="RequestDescriptionDialogText">
              Delivery Location: {request.deliveryLocation}
            </div>
            <div className="RequestDescriptionDialogText">
              Items:
              {request.items.map((item) => {
                return (
                  <div className="RequestDescriptionDialogItems" key={item}>
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="RequestDescriptionDialogText">
              Payment Method: {request.paymentMethod}
            </div>
            <div className="RequestDescriptionDialogText">
              Requester Note: {request.requesterNote}
            </div>
            {showCollect && request.status == "ACCEPTED" && (
              <div className="RequestDescriptionDialogButtonDiv">
                <Button
                  onClick={handleCollect}
                  className="RequestDescriptionDialogButton"
                >
                  Collect
                </Button>
              </div>
            )}
            {showAccept && (
              <div className="RequestDescriptionDialogButtonDiv">
                <Button
                  onClick={handleAcceptRequest}
                  variant="outlined"
                  className="RequestDescriptionDialogButton"
                >
                  Accept
                </Button>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <span
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 MyRequestCard"
        onClick={() => {
          setShowRequestDescription(true);
        }}
      >
        <div className="Head">
          <div className="PickupLocation">From: {request.pickupLocation}</div>
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
      </span>
    </span>
  );
}

export default RequestCard;
