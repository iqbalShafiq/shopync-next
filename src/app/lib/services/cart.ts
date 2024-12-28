import { api } from "../api-client";
import type { Failure } from "../types";
import type { Product } from "@/app/lib/services/products";

export interface UpsertCart {
	productId: string;
	quantity: number;
}

export interface ProductInCart {
	quantity: number;
	product: Product;
}

export const cartService = {
	getByUserId: async () => {
		return await api.get<ProductInCart[] | Failure>("/carts");
	},
	addItem: async (data: UpsertCart) => {
		return await api.post<ProductInCart | Failure>("/carts", data);
	},
	updateItem: async (data: UpsertCart) => {
		return await api.patch<ProductInCart | Failure>("/carts", data);
	},
};
