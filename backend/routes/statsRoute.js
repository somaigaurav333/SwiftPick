import express from "express";

import { User } from "../models/userModel.js";
import { Location } from "../models/locationModel.js";
import { Request } from "../models/requestModel.js";

const router = express.Router();

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
        console.log("Hello");
        const deliveriesPerDay = await Request.aggregate([
            {
                $match: {
                    totalDeliveries: { $gt: 0 },
                },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.status(200).json(deliveriesPerDay);
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