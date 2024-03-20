import axios from "axios";

const axios_instance = axios.create({
  // baseURL: "https://swiftpick.onrender.com",
  baseURL: "http://localhost:5000",
});

export default axios_instance;
