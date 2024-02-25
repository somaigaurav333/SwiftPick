import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { jwtTokenKey , adminEmail, adminPass} from "../config.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const router = express.Router();


// Route for SignUp // Check on the user validation
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
    const userEmailExists = await User.findOne({ 'email': email });
    const userNameExists = await User.findOne({ 'username': username });
    console.log(userEmailExists)
    if (userEmailExists || userNameExists) {
      return res.json({ status: false, message: "User already exists" });
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

    const item = await User.create(newUser);
    return res.json({ status: true, message: "Record Registered" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.json({ status: false, message: "Wrong Password" });
  } else {
    const token = jwt.sign({ username: user.username }, jwtTokenKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600 });
    return res.json({ status: true, message: "login successfully" });
  }

})

//Route for forgot password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ status: false, message: "User Not Registered" })
    }

    const token = jwt.sign({id: user._id}, jwtTokenKey, {expiresIn: '5m'})

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: adminEmail,  // Send email from address and password
        pass: adminPass
      }
    });
    
    var mailOptions = {
      from: adminEmail,
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:3000/auth/forgot-password/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return res.json({status: false, message:"Error sending email"});
      } else {
        return res.json({status: true, message:"Email Sent"});
      }
    });
  } catch (error) {
    console.log(error);
  }
});



export default router;
