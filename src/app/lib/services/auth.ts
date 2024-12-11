// lib/services/auth.ts
import { axiosInstance } from "../axios";

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	refreshToken: string;
	user: {
		id: string;
		email: string;
		name: string;
	};
}

export const authService = {
	register: async (credentials: RegisterCredentials) => {
		const { data } = await axiosInstance.post<AuthResponse>(
			"/auth/register",
			credentials,
		);

		return data;
	},

	login: async (credentials: LoginCredentials) => {
		const { data } = await axiosInstance.post<AuthResponse>(
			"/auth/login",
			credentials,
		);

		localStorage.setItem("token", data.token);
		return data;
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
		} finally {
			localStorage.removeItem("token");
		}
	},
};
