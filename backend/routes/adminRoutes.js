import express from "express";
import locationRoute from "./locationRoute.js";

import { User } from "../models/userModel.js";
import { Location } from "../models/locationModel.js";

const router = express.Router();

//Route for add location
router.post("/locations", async (req, res) => {
  try {
    if (!req.body.location || !req.body.coordinate) {
      return res.status(400).send({
        message: "Required fields not found",
      });
    }
    const newLoc = {
      location: req.body.location,
      coordinate: req.body.coordinate,
    };
    const item = await Location.create(newLoc);
    return res.status(200).send(item);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route to get all location
router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find({});
    return res.status(200).json({
      count: locations.length,
      data: locations,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route to get location by id
router.get("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loc = await Location.findById(id);
    return res.status(200).json(loc);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route to update a location
router.put("/location/:id", async (req, res) => {
  try {
    if (!req.body.location || !req.body.coordinate) {
      return res.status(400).send({
        message: "Send all required fields: Location and Coordinate",
      });
    }
    const { id } = req.params;
    const result = await Location.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Location not found" });
    }
    return res.status(200).send({ message: "Location update successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Route to delete location by id
router.delete("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Location.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Location not found" });
    }
    return res.status(200).send({ message: "Location deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to get all Users
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});

    const sanitizedUsers = users.map((user) => {
      const { password, ...rest } = user.toObject(); // ToObject() to convert Mongoose document to plain JavaScript object
      return rest;
    });

    return res.status(200).json({
      count: sanitizedUsers.length,
      data: sanitizedUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Route to delete user by id
router.delete("/userDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to validate user by id
router.post("/userValidate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    result.isVerified = true;
    await result.save();

    return res
      .status(200)
      .send({ message: "User validation status updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Route to strike user
router.post("/userStrike/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    result.isVerified = false;
    await result.save();

    return res.status(200).send({ message: "User striked successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
