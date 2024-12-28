"use server";

import { cartService } from "@/app/lib/services/cart";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateQuantitySchema = z.object({
	productId: z.string(),
	quantity: z.number().min(0),
});

const updateCartQuantityAction = async (
	productId: string,
	quantity: number,
) => {
	try {
		// Validate input
		const validated = updateQuantitySchema.parse({ productId, quantity });

		// Update cart quantity
		await cartService.updateItem(validated);

		// Revalidate cart path
		revalidatePath("/cart");

		return { success: true };
	} catch (error) {
		console.error("Failed to update cart quantity:", error);
		return { success: false, error: "Failed to update quantity" };
	}
};

export default updateCartQuantityAction;
