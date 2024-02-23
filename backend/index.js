import express, { response } from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/',(requset,response)=>{
    console.log(requset);
    return response.status(234).send('Welcome')
})

app.listen(PORT, ()=>{
    console.log(`App is listening to port: ${PORT}`);
});