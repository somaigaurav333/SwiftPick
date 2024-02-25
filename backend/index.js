import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Location } from "./models/locationModel.js";
import { Request } from "./models/requestModel.js";
import locationRoute from "./routes/locationRoute.js";
import requestRoute from "./routes/requestRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow All origins with default of cors(*)
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));
//Option 2: Allow Coustom Origin
// app.use(
//   cors({
//     origin: 'https://localhost:3000',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.get("/", (requset, response) => {
  // console.log(requset);
  return response.status(234).send("Welcome");
});

app.use(cookieParser());
app.use("/locations", locationRoute);
app.use("/requests", requestRoute);
app.use("/auth", userRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to location database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
