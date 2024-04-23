import React, { useState } from "react";
import "./RequestCard.css";
import axios_instance from "../axios";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

function RequestCard({
  request,
  user,
  showAccept,
  showCollect,
  showDelete,
  showClose,
}) {
  const [showRequestDescription, setShowRequestDescription] = useState(false);
  const [rating, setRating] = useState(null);
  const [hoverValue, setHoverValue] = useState(null);

  const handleHover = (event, newValue) => {
    setHoverValue(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmitRating = async () => {
    try {
      const response = await axios_instance.put(
        "/auth/users/requesterRating/" + request.requesterId,
        { rating: rating }
      );
      alert(response.data.message);
    } catch (err) {
      alert(err);
    }
    setShowRequestDescription(false);
  };

  const handleCloseDialog = () => {
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
        setShowRequestDescription(false);
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
        setShowRequestDescription(false);
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
        setShowRequestDescription(false);
      });
  };
  const handleClose = async () => {
    const response = await axios_instance
      .post("/requests/close/" + request._id)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          alert("Request Closed");
        } else {
          alert("Could not close the request");
        }
        setShowRequestDescription(false);
      });
  };

  return (
    <span>
      <div className="RequestDetail">
        <Dialog
          open={showRequestDescription}
          onClose={handleCloseDialog}
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
              {request.status != "OPEN" && (
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
                    variant="outlined"
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
                    variant="outlined"
                    className="RequestDescriptionDialogButton"
                  >
                    Delete
                  </Button>
                </div>
              )}
              {showClose && request.status == "COLLECTED" && (
                <div className="RequestDescriptionDialogButtonDiv">
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    className="RequestDescriptionDialogButton"
                  >
                    Close
                  </Button>
                </div>
              )}
            </DialogContentText>
            {request.status == "DELIVERED" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div className="RequestDescriptionDialogText">
                  Rate this user:
                </div>
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
              </div>
            )}
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
