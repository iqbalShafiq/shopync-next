import { getToken, removeToken } from "@/app/lib/auth";

const baseURL = "http://localhost:8000";

// Define types for request options
interface RequestOptions extends RequestInit {
	headers?: Record<string, string>;
}

// Define types for API methods
type ApiResponse<T = unknown> = Promise<T>;

interface ApiClient {
	get: <T>(url: string, options?: RequestOptions) => ApiResponse<T>;
	post: <T>(
		url: string,
		data?: unknown,
		options?: RequestOptions,
	) => ApiResponse<T>;
	put: <T>(
		url: string,
		data?: unknown,
		options?: RequestOptions,
	) => ApiResponse<T>;
	delete: <T>(url: string, options?: RequestOptions) => ApiResponse<T>;
}

async function fetchWithInterceptor<T>(
	url: string,
	options: RequestOptions = {},
): ApiResponse<T> {
	// Prepare headers
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...options.headers,
	};

	// Add token if exists
	const token = await getToken();
	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}
	console.log(headers);

	// Merge all options
	const requestOptions: RequestOptions = {
		...options,
		headers,
	};

	try {
		const response = await fetch(`${baseURL}${url}`, requestOptions);

		return response.json();
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error("An unknown error occurred");
	}
}

// Helper method to set the base URL with query parameters
export function setEndpoint(url: string, params: URLSearchParams) {
	const queryString = params.toString();
	return `${url}?${queryString}`;
}

// Helper methods for common HTTP methods
export const api: ApiClient = {
	get: <T>(url: string, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(url, {
			...options,
			method: "GET",
		});
	},

	post: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(url, {
			...options,
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	put: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(url, {
			...options,
			method: "PUT",
			body: JSON.stringify(data),
		});
	},

	delete: <T>(url: string, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(url, {
			...options,
			method: "DELETE",
		});
	},
};
