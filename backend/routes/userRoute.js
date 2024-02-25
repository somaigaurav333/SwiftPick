import express from "express";
import { User } from "../models/userModel.js";
// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt";

const router = express.Router();

//Route for SignUp // Check on the user validation
router.post("/signup", async (req, res) => {
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
      const {
        username,
        email,
        password,
        roomNumber,
        hostelName,
        gender,
        phoneNumber
      } = req.body;
      
      // Check if user is already existing
      const userEmailExists = User.find ({email});
      if(userEmailExists){
        return res.json({message: "User already exists"});
      }
      // Hash Password

      const hashPassword = await bcrypt.hash(password, 10);
      // Validate Email
      const newUser = {
        username: username,
        email: email,
        password: hashPassword,
        roomNumber: roomNumber,
        hostelName: hostelName,
        gender: gender,
        phoneNumber: phoneNumber,
        requesterRating: 0.1,
        requesteeRating: 0.1,
        totalRequests: 0,
        totalDeliveries: 0,
      };

      const item = await User.save(newUser);
      return res.json({status: true, message:"Record Registered"});
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
