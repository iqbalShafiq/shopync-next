import { api, setEndpoint } from "@/app/lib/api-client";
import type { Product } from "@/app/lib/services/products";
import { getValidParams } from "@/app/lib/utils";
import type { Failure } from "../types";

export interface UpsertCart {
	productId: string;
	quantity: number;
	increment?: boolean;
}

export interface ProductInCart {
	quantity: number;
	product: Product;
}

export interface ProductInCartData {
	data: ProductInCart[];
}

export interface CartItemParams {
	productId?: string;
}

export const cartService = {
	getItems: async (params: CartItemParams = {}) => {
		const validParams = getValidParams(params);
		const searchParams = new URLSearchParams(
			validParams as Record<string, string>,
		);
		const endpoint = setEndpoint("/carts", searchParams);

		return await api.get<ProductInCartData | Failure>(endpoint);
	},
	upsertItem: async (data: UpsertCart) => {
		return await api.post<unknown | Failure>("/carts", data);
	},
};
