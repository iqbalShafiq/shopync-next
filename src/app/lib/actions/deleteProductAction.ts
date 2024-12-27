"use server";

import { hasErrorResult } from "@/app/lib/utils";
import { productService } from "@/app/lib/services/products";
import { authService } from "@/app/lib/services/auth";

export type DeleteProductState = {
	success: boolean;
	message: string;
};

export async function deleteProductAction(
	_: DeleteProductState,
	formData: FormData,
): Promise<DeleteProductState> {
	const user = await authService.me();
	if (hasErrorResult(user)) {
		throw new Error("User not authenticated");
	}

	const productId = formData.get("productId") as string;
	const response = await productService.deleteProduct(productId);

	if (hasErrorResult(response)) {
		return {
			success: false,
			message: response.message,
		};
	}

	return {
		success: true,
		message: "Product deleted successfully",
	};
}
