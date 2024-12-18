"use server";

import { hasErrorResult } from "@/app/lib/utils";
import { redirect, RedirectType } from "next/navigation";
import { productService } from "@/app/lib/services/products";
import { authService } from "@/app/lib/services/auth";

export async function addProductAction(
	_: { message: string },
	formData: FormData,
) {
	const user = await authService.me();
	if (hasErrorResult(user)) {
		throw new Error("User not found");
	}

	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const price = Number(formData.get("price"));
	const quantity = Number(formData.get("quantity"));

	const response = await productService.addProduct({
		userId: user.data.id,
		name,
		description,
		price: price,
		quantity: quantity,
		imageUrl: "",
	});

	if (hasErrorResult(response)) {
		return {
			message: response.message,
			name: response.errorCode === 409 ? "" : name,
			description: response.errorCode === 409 ? "" : description,
			price: price,
			quantity: quantity,
		};
	}

	console.log(`Product added: ${JSON.stringify(response)}`);

	redirect(`/products/${response.data.id}`, RedirectType.push);
}
