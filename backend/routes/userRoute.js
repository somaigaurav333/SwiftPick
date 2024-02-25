import express from "express";
import { User } from "../models/userModel.js";
const bcrypt = require('bcrypt');

const router = express.Router();

//Route for SignUp
router.post("/", async (req, res) => {
    try {
      if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.roomNumber ||
        !req.body.hostelName ||
        !req.body.gender ||
        !req.body.phoneNumber
      ) {
        return res.status(400).send({
          message: "Required fields not found",
        });
      }
      // Hash Password
      // Validate Email
      // Check if user is already existing
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,    // store hashed password
        roomNumber: req.body.roomNumber,
        hostelName: req.body.hostelName,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        requesterRating: 0,
        requesteeRating: 0,
        totalRequests: 0,
        totalDeliveries: 0,
      };
      const item = await User.create(newUser);
      return res.status(201).send(item);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

//Route to get location by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loc = await Location.findById(id);
    return res.status(200).json(loc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Hash password before saving

export default router;
