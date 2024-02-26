import express from "express";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { jwtTokenKey, adminEmail, adminPass } from "../config.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const router = express.Router();

/*
  Few Points to be noted:
    1) We have to change the jwt Key to a strong one
    2) The time the user would be allowed to be on the website
*/

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
    // console.log(userEmailExists)
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
    const payLoad = {
      _id: user._id,
      username: user.username,
      email: user.email,
      roomNumber: user.roomNumber,
      hostelName: user.hostelName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      requesterRating: user.requesterRating,
      requesteeRating: user.requesteeRating,
      totalRequests: user.totalRequests,
      totalDeliveries: user.totalDeliveries
    }
    const token = jwt.sign(payLoad, jwtTokenKey, { expiresIn: "60s" });
    const options = {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 1),
      httpOnly: true,
      sameSite: 'lax'
    }
    res.cookie(String(user._id), token, options);

    return res.json({ status: true, message: "login successfully", user: user, token });
  }

})

//Route for forgot password
router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ status: false, message: "User Not Registered" })
    }

    const token = jwt.sign({ id: user._id }, jwtTokenKey, { expiresIn: '5m' })

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: adminEmail,  // Send email from address and password
        pass: adminPass
      }
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E")
    var mailOptions = {
      from: adminEmail,
      to: email,
      subject: 'Reset Password',
      text: `http://localhost:3000/auth/resetPassword/${encodedToken}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: false, message: "Error sending email" + info });
      } else {
        return res.json({ status: true, message: "Email Sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Route for Rest Password
router.post('/resetPassword/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = await jwt.verify(token, jwtTokenKey);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
    return res.json({ status: true, message: "Updated Password" })
  } catch (error) {
    return res.json("Invalid token");
  }
})

// verifyUser
// export const verifyToken = (req, res, next) => {
//   const headers = req.headers[`authorization`];
//   console.log(headers);
//   const token = headers.split(" ")[1];
//   if (!token) {
//     return res.status(404).json({ message: "No token found" });
//   }
//   jwt.verify(String(token), jwtTokenKey, (err, user) => {
//     if (err) {
//       return res.status(400), json({ message: "Invalid Token" });
//     }
//     console.log(user.id);
//     req.id = user.id;
//   });
//   next();
// }

// Route for login verification
router.get('/verifyLogin', async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const token = cookies.split('=')[1];
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    jwt.verify(String(token), jwtTokenKey, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.id = user._id;
    });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return res.status(200).json({ message: "Completed" });
});

const getUser = async (req, res, next) =>{
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }

  if(!user){
    return res.status(404).json({message: "User not found"});
  }
  return res.status(200).json({user})
}


export default router;
