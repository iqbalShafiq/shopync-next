import { getToken } from "@/app/lib/auth";

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
	postFile: <T>(
		url: string,
		data?: FormData,
		options?: RequestOptions,
	) => ApiResponse<T>;
	patch: <T>(
		url: string,
		data?: unknown,
		options?: RequestOptions,
	) => ApiResponse<T>;
	patchFile: <T>(
		url: string,
		data?: FormData,
		options?: RequestOptions,
	) => ApiResponse<T>;
	delete: <T>(url: string, options?: RequestOptions) => ApiResponse<T>;
}

function getClientToken() {
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith("auth="))
		?.split("=")[1];
}

async function fetchWithInterceptor<T>(
	url: string,
	options: RequestOptions = {},
	contentType: string | null = "application/json",
): ApiResponse<T> {
	const headers: Record<string, string> = {
		...options.headers,
	};

	if (contentType) {
		headers["Content-Type"] = contentType;
	}

	// Use client-side token retrieval
	const isServer = typeof window === "undefined";
	console.log(`isServer: ${isServer}`);
	const token = isServer ? await getToken() : getClientToken();

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

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

	postFile: <T>(url: string, data?: FormData, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(
			url,
			{
				...options,
				method: "POST",
				body: data,
			},
			null,
		);
	},

	patch: <T>(url: string, data?: unknown, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(url, {
			...options,
			method: "PATCH",
			body: JSON.stringify(data),
		});
	},

	patchFile: <T>(
		url: string,
		data?: FormData,
		options: RequestOptions = {},
	) => {
		return fetchWithInterceptor<T>(
			url,
			{
				...options,
				method: "PATCH",
				body: data,
			},
			null,
		);
	},

	delete: <T>(url: string, options: RequestOptions = {}) => {
		return fetchWithInterceptor<T>(url, {
			...options,
			method: "DELETE",
		});
	},
};
