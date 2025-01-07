import { api } from "@/app/lib/api-client";

export interface Category {
	name: string;
	description?: string;
}

export interface CategoriesResponse {
	data: Category[];
}

export const categoryService = {
	getAll: async () => {
		return await api.get<CategoriesResponse>("/categories");
	},
};
