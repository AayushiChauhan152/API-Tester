import axios from "axios";

const baseUrl = import.meta.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
