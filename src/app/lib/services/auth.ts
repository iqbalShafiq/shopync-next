import { api } from "@/app/lib/api-client";
import { setToken } from "@/app/lib/auth";
import type { Failure } from "@/app/lib/types";

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
	data: {
		id: string;
		email: string;
		name: string;
		token: string;
	};
}

export default function isAuthResponse(
	response: unknown,
): response is AuthResponse {
	return (response as AuthResponse).data !== undefined;
}

export const authService = {
	register: async (credentials: RegisterCredentials) => {
		return await api.post<AuthResponse | Failure>("/auth/register", credentials);
	},

	login: async (credentials: LoginCredentials) => {
		const data = await api.post<AuthResponse | Failure>(
			"/auth/login",
			credentials,
		);
		if (isAuthResponse(data)) {
			await setToken(data.data.token);
		}
		console.log(`data: ${isAuthResponse(data)}`);
		return data;
	},
};
