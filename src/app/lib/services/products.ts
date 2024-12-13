import { api } from "@/app/lib/api-client";

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
	getAll: async (params: ProductQueryParams): Promise<ProductResponse[]> => {
		return await api.get<ProductResponse | Failure>("/products", {
			params,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`, // TODO
			},
		});
	},
};
