import React, { useState } from "react";
import "./RequestCard.css";
import axios_instance from "../axios";
import { Button, colors } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const iconBlue = L.icon({
  iconUrl: "marker-icon-blue.png",
  shadowUrl: "marker-shadow.png",
});

const iconGreen = L.icon({
  iconUrl: "marker-icon-green.png",
  shadowUrl: "marker-shadow.png",
});

function RequestCard({
  request,
  user,
  showAccept,
  showCollect,
  showDelete,
  showClose,
}) {
  const [showRequestDescription, setShowRequestDescription] = useState(false);
  const [showMapDescription, setShowMapDescription] = useState(false);
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

    handleCloseRequest();
    setShowRequestDescription(false);
  };

  const handleCloseDialog = () => {
    setShowRequestDescription(false);
    setShowMapDescription(false);
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
  const handleCloseRequest = async () => {
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

        <Dialog
          open={showMapDescription}
          onClose={handleCloseDialog}
          className="RequestDescriptionDialog"
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle className="RequestDescriptionDialogTitle">
            Request Details
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="RequestDescriptionDialogText">
              <div className="outerdiv">
                <div className="detailsdiv-map">
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
                        <div
                          className="RequestDescriptionDialogItems"
                          key={item}
                        >
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
                  {showDelete && request.status === "OPEN" && (
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
                </div>
                <div className="mapdiv">
                  <MapContainer
                    center={[17.544589442898644, 78.57276072353719]}
                    zoom={16.5}
                    style={{ height: "75vh", width: "45vw" }}
                    scrollWheelZoom={false}
                    className="leaflet-container"
                    minZoom={16}
                    maxZoom={18}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      position={[17.544589442898644, 78.57276072353719]}
                      icon={iconGreen}
                      style={{ colors: "green" }}
                    >
                      <Popup>BPHC</Popup>
                    </Marker>
                    <Marker
                      position={[17.543871814277598, 78.5762166760505]}
                      icon={iconBlue}
                    >
                      <Popup>BPHC</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </DialogContentText>
            {request.status === "DELIVERED" && (
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
          if (request.status === "ACCEPTED" || request.status === "COLLECTED") {
            setShowMapDescription(true);
          } else if (
            request.status === "OPEN" ||
            request.status === "DELIVERED" ||
            request.status === "CLOSED"
          ) {
            setShowRequestDescription(true);
          }
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
