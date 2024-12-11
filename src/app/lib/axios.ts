import axios from "axios";
import { useRouter } from "next/navigation";

const router = useRouter();
const baseURL = process.env.BASE_URL;

export const axiosInstance = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("token");
			router.push("/login");
			return Promise.reject(error);
		}
		return Promise.reject(error);
	},
);
