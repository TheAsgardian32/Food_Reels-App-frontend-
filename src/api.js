// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // base URL will switch automatically
  withCredentials: true,
});

export default API;
