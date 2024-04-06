import React, { useState } from "react";
import "./RequestCard.css";
import axios_instance from "../axios";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
function RequestCard({ request, user, showAccept, showCollect, showDelete }) {
  const [showRequestDescription, setShowRequestDescription] = useState(false);

  const handleClose = () => {
    setShowRequestDescription(false);
  };

  const handleAcceptRequest = async () => {
    const response = await axios_instance
      .post("/requests/accept/" + request._id + "/" + user._id)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("Request Accepted Successfully");
        } else {
          alert("Could not accept request");
        }
      });
  };
  const handleCollect = async () => {
    const response = await axios_instance
      .post("/requests/collect/" + request._id)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("Request Marked as Collected");
        } else {
          alert("Could not mark request as collected");
        }
      });
  };
  const handleDelete = async () => {
    const response = await axios_instance
      .post("/requests/delete/" + request._id)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("Request Deleted Successfully");
        } else {
          alert("Could not Delete Request");
        }
      });
  };

  return (
    <span>
      <div className="RequestDetail">
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
              {user &&
                showAccept &&
                request.requesterUsername != user.username && (
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
              {showDelete && request.status == "OPEN" && (
                <div className="RequestDescriptionDialogButtonDiv">
                  <Button
                    onClick={handleDelete}
                    className="RequestDescriptionDialogButton"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
      <span
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 RequestCard"
        onClick={() => {
          setShowRequestDescription(true);
        }}
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
      </span>
    </span>
  );
}

export default RequestCard;
