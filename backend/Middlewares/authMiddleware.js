import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Admin } from "../models/adminModel.js";

const verifyToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie || "";
    const token = cookies.split("=")[1];
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    jwt.verify(token, process.env.jwtTokenKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Token" });
      }
      req.id = user._id;
      next();
    });
  } catch (error) {
    return res.status(404).json({ message: "Invalid Token" });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

const getAdmin = async (req, res, next) => {
  const userId = req.id;
  try {
    const admin = await Admin.findById(userId, "-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ admin });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie || "";
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "No token found" });
    }
    jwt.verify(prevToken, process.env.jwtTokenKey, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid Token" });
      }
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
        totalDeliveries: user.totalDeliveries,
      };
      const token = jwt.sign(payLoad, process.env.jwtTokenKey, {
        expiresIn: "11m",
      });
      const options = {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 10),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      res.cookie(String(user._id), token, options);
      return res.status(200).json({ token });
    });
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token" });
  }
};

const refreshAdminToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie || "";
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(400).json({ message: "No token found" });
    }
    jwt.verify(prevToken, process.env.jwtTokenKey, (err, admin) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid Token" });
      }
      const payLoad = {
        _id: admin._id,
        username: admin.username,
        email: admin.email,
      };
      const token = jwt.sign(payLoad, process.env.jwtTokenKey, {
        expiresIn: "11m",
      });
      const options = {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 10),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      res.cookie(String(admin._id), token, options);
      return res.status(200).json({ token });
    });
  } catch (error) {
    return res.status(500).json({ message: "Invalid Token" });
  }
};

export { verifyToken, getUser, refreshToken, getAdmin, refreshAdminToken };
