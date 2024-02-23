import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    coordinate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Location = mongoose.model("Location", locationSchema);
