import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    deliveryLocation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      requred: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    items: {
      type: [
        {
          type: String,
        },
      ],
      required: true,
    },
    requesterNote: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.model("Request", requestSchema);
