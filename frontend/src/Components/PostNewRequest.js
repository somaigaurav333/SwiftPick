import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function PostNewRequest() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          color="success"
          aria-label="add"
          onClick={handleClickOpen}
        //   style={{ background: "#008080" }}
          style={{ background: "#03dac6" }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            const pickupLocation = formJson.pickupLocation;
            const deliveryLocation = formJson.deliveryLocation;
            const phoneNumber = formJson.phoneNumber;
            const paymentMethod = formJson.paymentMethod;
            const items = formJson.items;
            const requesterNote = formJson.requesterNote;
            const status = formJson.status;
            // console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Post a New Request</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the following details to post a new request
          </DialogContentText>

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
          <TextField
            autoFocus
            required
            margin="dense"
            id="items"
            name="items"
            label="Items"
            type="items"
            fullWidth
            variant="standard"
          />
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
