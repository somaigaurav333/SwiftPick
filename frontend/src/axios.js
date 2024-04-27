import axios from "axios";

const axios_instance = axios.create({
  // baseURL: "https://swiftpick-2dm0.onrender.com",
  baseURL: "http://localhost:5000",
});

export default axios_instance;
