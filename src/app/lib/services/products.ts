import { api } from "@/app/lib/api-client";
import { getToken } from "@/app/lib/auth";
import type { Failure } from "@/app/lib/types";

export interface ProductQueryParams {
	search?: string;
	limit?: number;
	page?: number;
}

export interface UpsertProduct {
	name: string;
	price: number;
	quantity: number;
	userId: string;
	description: string;
	imageUrl: string | null;
}

export interface ProductResponse {
	id: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	userId: string;
	imageUrl: string | null;
}

export const productService = {
	getAll: async (params: ProductQueryParams) => {
		const data = await api.get<ProductResponse[] | Failure>("/products");
		console.log(data);

		return data;
	},
};
