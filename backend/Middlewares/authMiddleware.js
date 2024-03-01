import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const verifyToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.jwtTokenKey, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.id = user._id;
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

const refreshToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
      return res.status(401).json({ message: "No token found" });
    }
    jwt.verify(String(prevToken), process.env.jwtTokenKey, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid Token" });
      }

      // console.log(user);

      res.clearCookie(`${user._id}`);
      req.cookies[`${user._id}`] = "";

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

      // console.log("Regenerated Token\n", token);

      const options = {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 10),
        httpOnly: true,
        sameSite: "lax",
      };

      res.cookie(String(user._id), token, options);

      req.id = user._id;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export { verifyToken, getUser, refreshToken };
