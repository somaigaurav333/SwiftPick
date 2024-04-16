import React from "react";
import "./MyRequestCard.css";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios_instance from "../axios";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import { useState } from "react";

function RequestCard({ request, showAccept, showCollect, showDelete }) {
  const [showRequestDescription, setShowRequestDescription] = useState(false);
  const [rating, setRating] = useState(null);
  const [hoverValue, setHoverValue] = useState(null);

  const handleHover = (event, newValue) => {
    setHoverValue(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmitRating = () => {
    alert(`You submitted a rating of ${rating} stars.`);
  };
  const handleClose = () => {
    setShowRequestDescription(false);
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
        setShowRequestDescription(false);
      });
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

            <div className="RequestDescriptionDialogText">
              Requester Phone: {request.phoneNumber}
            </div>
            {/* {request.status != "OPEN" && (
              <div>
                <div className="RequestDescriptionDialogText">
                  Requestee Name: {request.requesteeId}
                </div>
                <div className="RequestDescriptionDialogText">
                  Requestee Phone Number: {request.requesteeId}
                </div>
              </div>
            )} */}
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
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="RequestDescriptionDialogText">Rate this user:</div>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="user-rating"
                value={rating}
                precision={0.5}
                onChange={handleRatingChange}
                onChangeActive={handleHover}
                size="large"
                sx={{ fontSize: "50px" }}
              />
            </Box>
            {rating !== null && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitRating}
              >
                Submit Rating
              </Button>
            )}
          </div> */}
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
