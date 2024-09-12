import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend-web-88ei.onrender.com/api/v1",
  withCredentials: true,
});
