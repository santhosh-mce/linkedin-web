import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://linkedin-web-app-h0x0.onrender.com/api/v1",
	withCredentials: true,
});
