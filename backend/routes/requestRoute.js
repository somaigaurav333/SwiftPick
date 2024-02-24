import express from "express";
import { Request } from "../models/requestModel.js";

const router = express.Router();

//Route for add request
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.pickupLocation ||
      !req.body.deliveryLocation ||
      !req.body.phoneNumber ||
      !req.body.paymentMethod ||
      !req.body.items ||
      !req.body.requesterNote ||
      !req.body.status
    ) {
      return res.status(400).send({
        message: "Required fields not found",
      });
    }
    const newReq = {
      name: req.body.name,
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      phoneNumber: req.body.phoneNumber,
      paymentMethod: req.body.paymentMethod,
      items: req.body.items,
      requesterNote: req.body.requesterNote,
      status: req.body.status,
    };
    const item = await Request.create(newReq);
    return res.status(201).send(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to get all requests
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

export default router;
