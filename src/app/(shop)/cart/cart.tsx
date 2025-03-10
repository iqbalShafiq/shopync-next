import CartItem from "@/app/(shop)/cart/_component/cartItem";
import { cartService } from "@/app/lib/services/cart";
import { hasErrorResult } from "@/app/lib/utils";
import { LucideShoppingCart } from "lucide-react";
import React from "react";

const Cart = async () => {
	const result = await cartService.getItems();

	if (hasErrorResult(result)) {
		throw new Error(result.message);
	}

	if (!result.data.length) {
		return (
			<div className="flex flex-col items-center justify-center py-8 font-semibold text-slate-400">
				<LucideShoppingCart size={24} />
				<h1 className="mt-3 text-md">Cart is empty</h1>
			</div>
		);
	}

	return (
		<div className={"flex flex-col items-start justify-start space-y-4 p-4"}>
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
