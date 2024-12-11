import { api } from "@/app/lib/api-client";
import { setToken } from "@/app/lib/auth";

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
	user: {
		id: string;
		email: string;
		name: string;
	};
}

export const authService = {
	register: async (credentials: RegisterCredentials) => {
		return await api.post<AuthResponse>("/auth/register", credentials);
	},

	login: async (credentials: LoginCredentials) => {
		const data = await api.post<AuthResponse>("/auth/login", credentials);

		setToken(data.token);
		return data;
	},
};
