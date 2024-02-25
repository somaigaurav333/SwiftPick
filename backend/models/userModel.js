import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roomNumber: {
            type: String,
            required: true,
        },
        hostelName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        requesterRating: {
            type: Number,
            required: true,
        },
        requesteeRating: {
            type: Number,
            required: true,
        },
        totalRequests: {
            type: Number,
            required: true,
        },
        totalDeliveries: {
            type: Number,
            required: true,
        },
    }
);

export const User = mongoose.model("User", userSchema); 