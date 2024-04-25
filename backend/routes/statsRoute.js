import express from "express";

import { User } from "../models/userModel.js";
import { Location } from "../models/locationModel.js";
import { Request } from "../models/requestModel.js";

const router = express.Router();

function formatDate(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

router.get('/getCount', async (req, res) => {
    try {
        // Your user data fetching logic here
        const counts = {
            userCount: await User.countDocuments(),
            locCount: await Location.countDocuments(),
            reqCount: await Request.countDocuments(),
        };
        res.status(200).json(counts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getPerDayReqs', async (req, res) =>{
  try {
    const stats = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      const formattedDate = formatDate(currentDate);

      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      const formattedNextDate = formatDate(nextDate);

      const totalRequests = await Request.countDocuments({
        date: { $gte: formattedDate, $lt: formattedNextDate },
      });

      const completedRequests = await Request.countDocuments({
        date: { $gte: formattedDate, $lt: formattedNextDate },
        status: "CLOSED",
      });

      const dailyStats = {
        date: formattedDate,
        "Completed Requests": completedRequests,
        "Total Requests": totalRequests,
      };

      stats.unshift(dailyStats);
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Route to get no. of requests based on Pickup Location
router.get('/noOfReqLoc/pickUpLoc', async (req, res) =>{
    try {
        const requestCounts = await Request.aggregate([
          {
            $group: {
              _id: "$pickupLocation",
              count: { $sum: 1 },
            },
          },
        ]);

        const requestList = requestCounts.map((item) => ({
            pickupLocation: item._id,
            count: item.count,
          }));
    
        res.json(requestList);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

// Route to get no. of requests based on Delivery Location
router.get('/noOfReqLoc/deliveryLoc', async (req, res) =>{
    try {
        const requestCounts = await Request.aggregate([
          {
            $group: {
              _id: "$deliveryLocation",
              count: { $sum: 1 },
            },
          },
        ]);
    
        const requestList = requestCounts.map((item) => ({
            deliveryLocation: item._id,
            count: item.count,
          }));
    
        res.json(requestList);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

export default router