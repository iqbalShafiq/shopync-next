"use server";

import { cartService } from "@/app/lib/services/cart";
import { hasErrorResult } from "@/app/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateQuantitySchema = z.object({
	productId: z.string(),
	quantity: z.number(),
	increment: z.boolean().optional(),
});

const upsertCartQuantityAction = async (
	productId: string,
	quantity: number,
	increment?: boolean,
) => {
	try {
		// Validate input
		const validated = updateQuantitySchema.parse({
			productId,
			quantity,
			increment,
		});

		// Update cart quantity
		const result = await cartService.upsertItem(validated);
		if (hasErrorResult(result)) {
			return { success: false, error: result.message };
		}

		// Revalidate cart path
		revalidatePath("/cart");

		return { success: true };
	} catch (error) {
		console.error("Failed to update cart quantity:", error);
		return { success: false, error: "Failed to update quantity" };
	}
};

export default upsertCartQuantityAction;
