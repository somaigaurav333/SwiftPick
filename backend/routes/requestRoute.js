import express from "express";
import { Request } from "../models/requestModel.js";
import mongoose, { Mongoose } from "mongoose";
const router = express.Router();

const STATUS_OPEN = "OPEN";
const STATUS_ACCEPTED = "ACCEPTED";
const STATUS_COLLECTED = "COLLECTED";
const STATUS_DELIVERED = "DELIVERED";

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
      requesteeId: "null",
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      phoneNumber: req.body.phoneNumber,
      paymentMethod: req.body.paymentMethod,
      items: req.body.items,
      requesterNote: req.body.requesterNote,
      status: STATUS_OPEN,
      date: req.body.date,
      time: req.body.time,
    };
    const item = await Request.create(newReq);
    return res.status(201).send(item);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
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
    return res.status(500).send({ message: error.message });
  }
});

// Route to get all requests
router.get("/open", async (req, res) => {
  try {
    const requests = await Request.find({ status: STATUS_OPEN });
    return res.status(200).json({
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get all requests by userid
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
    return res.status(500).send({ message: error.message });
  }
});

// Route to get all open, accepted, collected requests by userid
router.get("/open/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const result = await Request.find({
      requesterId: userid,
      status: { $in: [STATUS_OPEN, STATUS_ACCEPTED, STATUS_COLLECTED] },
    });
    if (!result) {
      return res.status(404).json({ message: "Requests not found" });
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get all delivered requests by userid
router.get("/delivered/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const result = await Request.find({
      requesterId: userid,
      status: STATUS_DELIVERED,
    });
    if (!result) {
      return res.status(404).json({ message: "Requests not found" });
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route to collect a request
router.post("/collect/:requestid", async (req, res) => {
  try {
    const requestid = req.params.requestid;
    const userRequest = await Request.find({
      _id: requestid,
      status: STATUS_ACCEPTED,
    });
    if (userRequest) {
      await Request.findByIdAndUpdate(
        { _id: requestid },
        { status: STATUS_COLLECTED }
      );
      return res.status(200).send({ message: "Request Collected" });
    } else {
      return res
        .status(400)
        .send({ message: "No such accepted request exists" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: error.message });
  }
});

// Route to accept a request
router.post("/accept/:requestid/:requesteeid", async (req, res) => {
  try {
    const requestid = req.params.requestid;
    const requesteeid = req.params.requesteeid;
    const userRequest = await Request.find({
      _id: requestid,
      status: STATUS_OPEN,
    });
    if (userRequest) {
      await Request.findByIdAndUpdate(
        { _id: requestid },
        { requesteeId: requesteeid, status: STATUS_ACCEPTED }
      );
      return res.status(200).send({ message: "Request Accepted" });
    } else {
      return res.status(400).send({ message: "No such open request exists" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: error.message });
  }
});

// Route to fetch pending requests
router.get("/pending/:requesteeid", async (req, res) => {
  try {
    const { requesteeid } = req.params;
    const result = await Request.find({
      requesteeId: requesteeid,
      status: { $in: [STATUS_ACCEPTED, STATUS_COLLECTED] },
    });
    if (!result) {
      return res.status(404).json({ message: "Requests not found" });
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to close a collected request by the requester
router.post("/close/:requestid", async (req, res) => {
  try {
    const requestid = req.params.requestid;
    const userRequest = await Request.find({
      _id: requestid,
      status: STATUS_COLLECTED,
    });
    if (userRequest) {
      await Request.findByIdAndUpdate(
        { _id: requestid },
        { status: STATUS_DELIVERED }
      );
      return res.status(200).send({ message: "Request Delivered" });
    } else {
      return res
        .status(400)
        .send({ message: "No such Collected request exists" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ message: error.message });
  }
});

//Route to delete request by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Request.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Request not found" });
    }
    return res.status(200).send({ message: "Request deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
