import CartItem from "@/app/(shop)/cart/_component/cartItem";
import React from "react";
import { cartService } from "@/app/lib/services/cart";
import { hasErrorResult } from "@/app/lib/utils";
import { LucideShoppingCart } from "lucide-react";

const Cart = async () => {
	const result = await cartService.getByUserId();

	if (hasErrorResult(result)) {
		throw new Error(result.message);
	}

	if (!result.data.length) {
		return (
			<div className="flex flex-col items-center justify-center font-semibold text-slate-400">
				<LucideShoppingCart size={24} />
				<h1 className="mt-3 text-md">Cart is empty</h1>
			</div>
		);
	}

	return (
		<div>
			{result.data.map((item) => (
				<CartItem
					key={item.product.id}
					quantity={item.quantity}
					product={item.product}
				/>
			))}
		</div>
	);
};

export default Cart;
