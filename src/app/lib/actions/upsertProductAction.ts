"use server";

import { authService } from "@/app/lib/services/auth";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import { RedirectType, redirect } from "next/navigation";
import type { Category } from "../services/categories";

export async function upsertProductAction(
	_: { message: string },
	formData: FormData,
) {
	const user = await authService.me();
	if (hasErrorResult(user)) {
		throw new Error("User not found");
	}

	const id = formData?.get("id") as string | undefined;
	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const price = Number(formData.get("price"));
	const quantity = Number(formData.get("quantity"));
	const image = formData.get("image") as File;
	const categoriesJson = formData.get("categories") as string;
	const categories: Category[] = JSON.parse(categoriesJson);

	const payload = new FormData();
	formData.append("userId", user.data.id);
	payload.append("name", name);
	payload.append("description", description);
	payload.append("price", price.toString());
	payload.append("quantity", quantity.toString());
	payload.append("image", image);
	payload.append("categories", JSON.stringify(categories));

	if (id) {
		payload.append("id", id);
	}

	const response = id
		? await productService.updateProduct(id, payload)
		: await productService.addProduct(payload);

	if (hasErrorResult(response)) {
		return {
			message: response.message,
			name: response.errorCode === 409 ? "" : name,
			description: response.errorCode === 409 ? "" : description,
			price: price,
			quantity: quantity,
		};
	}

	if (id) {
		redirect(`/products/editor/${response.data.id}`, RedirectType.push);
	} else {
		redirect(`/products/${response.data.id}`, RedirectType.push);
	}
}
