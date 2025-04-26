import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/user", // Replace with your backend URL
  withCredentials: true, // Enable sending cookies with requests
});

export default axiosInstance;
