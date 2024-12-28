import { api } from "@/app/lib/api-client";
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

export interface ProductInCartData {
	data: ProductInCart[];
}

export const cartService = {
	getByUserId: async () => {
		return await api.get<ProductInCartData | Failure>("/carts");
	},
	addItem: async (data: UpsertCart) => {
		return await api.post<unknown | Failure>("/carts", data);
	},
	updateItem: async (data: UpsertCart) => {
		return await api.patch<unknown | Failure>("/carts", data);
	},
};
