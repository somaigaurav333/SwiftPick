import express from "express";
import { Request } from "../models/requestModel.js";

const router = express.Router();

// Route for add request
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.requesterUsername ||
      !req.body.requesterId ||
      !req.body.pickupLocation ||
      !req.body.deliveryLocation ||
      !req.body.phoneNumber ||
      !req.body.paymentMethod ||
      !req.body.items ||
      !req.body.requesterNote ||
      !req.body.status ||
      !req.body.date ||
      !req.body.time
    ) {
      return res.status(400).send({
        message: "Required fields not found",
      });
    }
    const newReq = {
      requesterId: req.body.requesterId,
      requesterUsername: req.body.requesterUsername,
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      phoneNumber: req.body.phoneNumber,
      paymentMethod: req.body.paymentMethod,
      items: req.body.items,
      requesterNote: req.body.requesterNote,
      status: req.body.status,
      date: req.body.date,
      time: req.body.time,
    };
    const item = await Request.create(newReq);
    return res.status(201).send(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find({});
    return res.status(200).json({
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get request by username
router.get("/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const result = await Request.find({ requesterId: userid });
    if (!result) {
      return res.status(404).json({ message: "Requests not found" });
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


export default router;
