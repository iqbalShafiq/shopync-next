"use server";

import { hasErrorResult } from "@/app/lib/utils";
import { redirect, RedirectType } from "next/navigation";
import { productService } from "@/app/lib/services/products";
import { authService } from "@/app/lib/services/auth";

export async function deleteProductAction(
	_: { message: string },
	formData: FormData,
) {
	const user = await authService.me();
	if (hasErrorResult(user)) {
		throw new Error("User not found");
	}

	const productId = formData.get("productId") as string;
	const response = await productService.deleteProduct(productId);

	if (hasErrorResult(response)) {
		return {
			message: response.message,
		};
	}

	console.log(`Product deleted: ${JSON.stringify(response)}`);

	redirect("/products/mine", RedirectType.push);
}
