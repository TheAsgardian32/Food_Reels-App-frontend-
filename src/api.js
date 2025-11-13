// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://food-reels-app-backend.onrender.com/", // base URL will switch automatically
  withCredentials: true,
});

export default API;
