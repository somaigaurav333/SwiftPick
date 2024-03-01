import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./PostNewRequest.css";

const locationsURL = "/locations";

export default function PostNewRequest() {
  const [open, setOpen] = React.useState(false);
  const [itemList, setItems] = useState([""]);
  const [locations, setLocations] = useState([""]);
  const [pickupLocation, setPickupLocation] = useState([]);
  const [deliveryLocation, setDeliveryLocation] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      const response = await axios_instance.get(locationsURL);
      setLocations(response.data.data);
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
      <a href="#" className="button" onClick={handleClickOpen}>
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
            const requesterUsername = "Kush";
            const pickupLocation = formJson.pickupLocation;
            const deliveryLocation = formJson.deliveryLocation;
            const phoneNumber = "0123456789";
            const paymentMethod = formJson.paymentMethod;
            const items = itemList;
            const requesterNote = formJson.requesterNote;
            const status = "open";
            const date =
              today.getDay() +
              " " +
              month[today.getMonth()] +
              " " +
              today.getYear();
            const time =
              today.getHours().toString() + ":" + today.getMinutes().toString();
            // console.log(email);
            await axios
              .post("http://localhost:5000/requests", {
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
          <FormControl fullWidth>
            <InputLabel id="pickupLocation">Pickup Location</InputLabel>
            <Select
              labelId="pickupLocation"
              id="pickupLocation"
              value={pickupLocation}
              label="pickupLocation"
              onChange={handlePickupChange}
            >
              {locations.map((location, index) => (
                <MenuItem value={locations[index]}>locations[index]</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="pickupLocation"
            name="pickupLocation"
            label="Pickup Location"
            type="pickupLocation"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="deliveryLocation"
            name="deliveryLocation"
            label="Delivery Location"
            type="deliveryLocation"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="paymentMethod"
            name="paymentMethod"
            label="Payment Method"
            type="paymentMethod"
            fullWidth
            variant="standard"
          />
          <span>Items</span>
          <div className="Item Container">
            {itemList.map((item, index) => (
              <div className="input_container" key={index}>
                <input
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(event) => handleItemChange(event, index)}
                />
                {itemList.length > 1 && (
                  <button onClick={() => handleDeleteItem(index)}>
                    Delete
                  </button>
                )}
                {index === itemList.length - 1 && (
                  <button onClick={() => handleAddItem()}>Add</button>
                )}
              </div>
            ))}

            {/* <div className="body"> {JSON.stringify(itemList)} </div> */}
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="requesterNote"
            name="requesterNote"
            label="Requester's Note"
            type="requesterNote"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Post</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
