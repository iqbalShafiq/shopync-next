"use server";

import { categoryService } from "../services/categories";

export async function createCategoryAction(categoryName: string) {
	try {
		const response = await categoryService.create({
			name: categoryName,
		});

		// Add the new category to the options
		const newCategory = {
			value: response.data.name,
			label: response.data.name,
		};

		return {
			success: true,
			newCategory,
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			error: "Failed to create category",
		};
	}
}
