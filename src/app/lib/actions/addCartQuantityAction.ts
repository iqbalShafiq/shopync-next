"use server";

import { cartService } from "@/app/lib/services/cart";
import { hasErrorResult } from "@/app/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addQuantitySchema = z.object({
	productId: z.string(),
	quantity: z.number().min(1),
});

const addCartQuantityAction = async (productId: string) => {
	try {
		// Validate input
		const validated = addQuantitySchema.parse({ productId, quantity: 1 });

		// Add cart quantity
		const result = await cartService.addItem(validated);
		if (hasErrorResult(result)) {
			return { success: false, error: result.message };
		}

		// Revalidate cart path
		revalidatePath("/products");

		return { success: true };
	} catch (error) {
		console.error("Failed to add cart quantity:", error);
		return { success: false, error: "Failed to add quantity" };
	}
};

export default addCartQuantityAction;
