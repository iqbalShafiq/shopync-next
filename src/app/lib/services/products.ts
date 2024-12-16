import { api, setEndpoint } from "@/app/lib/api-client";
import type { Failure, PaginatedResult } from "@/app/lib/types";
import { hasErrorResult } from "@/app/lib/utils";
import { authService } from "@/app/lib/services/auth";

export interface ProductQueryParams {
	limit?: number;
	page?: number;
	search?: string;
	userId?: string;
}

export interface UpsertProduct {
	name: string;
	price: number;
	quantity: number;
	userId: string;
	description: string;
	imageUrl: string | null;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	userId: string;
	imageUrl: string | null;
}

export const productService = {
	get: async (params: ProductQueryParams) => {
		const searchParams = new URLSearchParams(params as Record<string, string>);
		const endpoint = setEndpoint("/products", searchParams);
		return await api.get<PaginatedResult<Product> | Failure>(endpoint);
	},
};
