import axios from "axios";

const axios_instance = axios.create({
  baseURL: "https://swiftpick.onrender.com",
});

export default axios_instance;
