import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import axios_instance from "../axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./PostNewRequest.css";
import { useNavigate } from "react-router-dom";

const locationsURL = "admin/locations";

export default function PostNewRequest() {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axios_instance.get("/auth/verifyLogin", {
          withCredentials: true,
        });
        const data = res.data;
        setUser(data.user);
      } catch (error) {
        // Redirect user to login page if token verification fails
        navigate("/auth/login");
      }
    };

    const refreshToken = async () => {
      try {
        const res = await axios_instance.get("/auth/refresh", {
          withCredentials: true,
        });
        const data = res.data;
        setUser(data.user);
      } catch (error) {
        console.log("Error refreshing token:", error);
        // Handle error appropriately, such as displaying an error message to the user
      }
    };

    // Initial token verification
    verifyToken();

    // Set up interval to refresh token every 9 minutes
    const interval = setInterval(refreshToken, 1000 * 60 * 60);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, [navigate]); // Add navigate as a dependency

  const [open, setOpen] = React.useState(false);
  const [itemList, setItems] = useState([""]);
  const [locations, setLocations] = useState([""]);
  const [pickupLoc, setPickupLocation] = useState([]);
  const [deliveryLoc, setDeliveryLocation] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await axios_instance.get(locationsURL);
      setLocations(
        response.data.data.sort((a, b) => {
          const aLoc = a.location.toLowerCase();
          const bLoc = b.location.toLowerCase();
          if (aLoc < bLoc) return -1;
          else if (aLoc > bLoc) return 1;
          return 0;
        })
      );
      console.log(locations);
      console.log(response);
      return;
    }
    fetchLocations();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = () => {
    setItems([...itemList, ""]);
  };

  const handleItemChange = (event, index) => {
    console.log(event.target.value);
    let value = event.target.value;
    let onChangeValue = [...itemList];
    onChangeValue[index] = value;
    setItems(onChangeValue);
  };

  const handleDeleteItem = (index) => {
    const newArray = [...itemList];
    newArray.splice(index, 1);
    setItems(newArray);
  };

  const handlePickupChange = (event) => {
    setPickupLocation(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    setDeliveryLocation(event.target.value);
  };

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <React.Fragment>
      <a href="#" className="add-request-button" onClick={handleClickOpen}>
        <span className="iconh">+</span>
        <span className="texth">New Request</span>
      </a>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            let today = new Date();
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const requesterUsername = user.username;
            const requesterId = user._id;
            const pickupLocation = pickupLoc;
            const deliveryLocation = deliveryLoc;
            const phoneNumber = user.phoneNumber;
            const paymentMethod = formJson.paymentMethod;
            const items = itemList;
            const requesterNote = formJson.requesterNote;
            const status = "open";
            const date =
              today.getDate() +
              " " +
              month[today.getMonth()] +
              " " +
              today.getFullYear();
            const time =
              today.getHours().toString() + ":" + today.getMinutes().toString();
            // console.log(email);
            await axios_instance
              .post("/requests", {
                requesterId,
                requesterUsername,
                pickupLocation,
                deliveryLocation,
                phoneNumber,
                paymentMethod,
                items,
                requesterNote,
                status,
                date,
                time,
              })
              .then((response) => {
                console.log(response);
                if (response.status === 201) {
                  alert("Successfull Added");
                  navigate("/myRequests");
                } else {
                  alert("Retry");
                }
              })
              .catch((err) => {
                console.log(err);
              });
            handleClose();
          },
        }}
      >
        <DialogTitle>Post a New Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the following details to post a new request
          </DialogContentText>
          <FormControl fullWidth className="pickupLocation">
            <InputLabel id="pickupLocation">Pickup Location *</InputLabel>
            <Select
              labelId="pickupLocation"
              id="pickupLocation"
              value={pickupLoc}
              label="pickupLocation"
              onChange={handlePickupChange}
              required
            >
              {locations.map((location, index) => (
                <MenuItem value={locations[index].location}>
                  {locations[index].location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="deliveryDropdown">
            <FormControl fullWidth className="deliveryLocation">
              <InputLabel id="deliveryLocation">Delivery Location *</InputLabel>
              <Select
                labelId="deliveryLocation"
                id="deliveryLocation"
                value={deliveryLoc}
                label="deliveryLocation"
                onChange={handleDeliveryChange}
                required
              >
                {locations.map((location, index) => (
                  <MenuItem value={locations[index].location}>
                    {locations[index].location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <TextField
            autoFocus
            required
            // margin="dense"
            id="paymentMethod"
            name="paymentMethod"
            className="paymentMethod"
            label="Payment Method"
            type="paymentMethod"
            fullWidth
            variant="outlined"
          />
          <span className="items-text">Items *</span>
          <div className="Item-container">
            {itemList.map((item, index) => (
              <div className="input-container" key={index}>
                <input
                  type="text"
                  name="itemName"
                  className="input-field"
                  style={{
                    borderWidth: 2,
                    borderColorborder: "rgba(0, 0, 0, 1)",
                  }}
                  value={item.itemName}
                  onChange={(event) => handleItemChange(event, index)}
                />
                {itemList.length > 1 && (
                  <button
                    variant="outlined"
                    className="delete-button"
                    color="error"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Delete
                  </button>
                )}
                {index === itemList.length - 1 && (
                  <button
                    variant="outlined"
                    className="add-button"
                    color="success"
                    onClick={() => handleAddItem()}
                  >
                    Add
                  </button>
                )}
              </div>
            ))}

            {/* <div className="body"> {JSON.stringify(itemList)} </div> */}
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="requesterNote"
            name="requesterNote"
            label="Requester's Note"
            type="requesterNote"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
