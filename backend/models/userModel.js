import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
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
  numberOfrequesterRating: {
    type: Number,
    required: false,
  },
  numberOfrequesteeRating: {
    type: Number,
    required: false,
  },

  totalDeliveries: {
    type: Number,
    required: true,
  },
});

userSchema.pre("save", async function () {
  try {
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model("User", userSchema);
