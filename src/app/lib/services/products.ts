import { api, setEndpoint } from "@/app/lib/api-client";
import type { Failure, PaginatedResult } from "@/app/lib/types";
import { getValidParams } from "@/app/lib/utils";

export interface ProductQueryParams {
	limit?: number;
	page?: number;
	search?: string;
	userId?: string;
	excludedProductId?: string;
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
	categories: {
		category: {
			id: string;
			name: string;
			description?: string;
		};
	}[];
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
	addProduct: async (product: FormData) => {
		return await api.postFile<ProductData | Failure>("/products", product);
	},
	updateProduct: async (productId: string, product: FormData) => {
		return await api.patchFile<ProductData | Failure>(
			`/products/${productId}`,
			product,
		);
	},
	deleteProduct: async (productId: string) => {
		return await api.delete<unknown | Failure>(`/products/${productId}`);
	},
};
