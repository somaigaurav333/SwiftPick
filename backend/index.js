import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Location } from "./models/locationModel.js";
import { Request } from "./models/requestModel.js";
import locationRoute from "./routes/locationRoute.js";
import requestRoute from "./routes/requestRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow All origins with default of cors(*)
// app.use(cors());
//Option 2: Allow Coustom Origin
// app.use(cors({
// origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get("/", (requset, response) => {
  console.log(requset);
  return response.status(234).send("Welcome");
});

app.use("/locations", locationRoute);
app.use("/requests", requestRoute);

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
