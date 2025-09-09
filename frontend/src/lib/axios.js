import axios from "axios";
const BASE_URL =
  import.meta.env.MODE === "development" ? "https://payflow-backend-kve2.onrender.com/api" : "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
