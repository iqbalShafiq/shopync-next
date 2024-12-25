import { api, setEndpoint } from "@/app/lib/api-client";
import type { Failure, PaginatedResult } from "@/app/lib/types";
import { getValidParams } from "@/app/lib/utils";

export interface ProductQueryParams {
	limit?: number;
	page?: number;
	search?: string;
	userId?: string;
}

export interface AddProduct {
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
	user?: Seller | null | undefined;
}

export interface Seller {
	id: string;
	name: string;
	email: string;
	count: {
		products: number;
		cart: number;
	};
}

export interface ProductData {
	data: Product;
}

export const productService = {
	get: async (params: ProductQueryParams) => {
		const validParams = getValidParams(params);
		const searchParams = new URLSearchParams(
			validParams as Record<string, string>,
		);
		const endpoint = setEndpoint("/products", searchParams);
		return await api.get<PaginatedResult<Product> | Failure>(endpoint);
	},
	getById: async (id: string) => {
		return await api.get<ProductData | Failure>(`/products/${id}`);
	},
	addProduct: async (product: AddProduct) => {
		return await api.post<ProductData | Failure>("/products", product);
	},
};
