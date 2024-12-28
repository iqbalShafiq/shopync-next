"use client";

import Counter from "@/app/components/shared/counter";
import updateCartQuantityAction from "@/app/lib/actions/updateCartQuantityAction";
import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import debounce from "lodash/debounce";
import React from "react";

interface CartItemProps {
	quantity: number;
	product: Product;
}

const CartItem = ({ quantity, product }: CartItemProps) => {
	const { name, description, price, imageUrl, quantity: stock } = product;

	const [isPending, startTransition] = React.useTransition();
	const [optimisticQuantity, addOptimisticQuantity] = React.useOptimistic(
		quantity,
		(state, amount: number) => Math.max(1, state + amount),
	);
	const lastSavedQuantity = React.useRef(quantity);

	const debouncedUpdateQuantity = React.useCallback(
		debounce((itemId: string, newQuantity: number) => {
			startTransition(async () => {
				try {
					const result = await updateCartQuantityAction(itemId, newQuantity);

					if (result.success) {
						lastSavedQuantity.current = newQuantity;
					} else {
						toast({
							variant: "destructive",
							title: "Error",
							description: "Failed to update quantity",
						});
						addOptimisticQuantity(
							lastSavedQuantity.current - optimisticQuantity,
						);
					}
				} catch (error) {
					toast({
						variant: "destructive",
						title: "Error",
						description: "Failed to update quantity",
					});
					addOptimisticQuantity(lastSavedQuantity.current - optimisticQuantity);
				}
			});
		}, 800),
		[],
	);

	React.useEffect(() => {
		return () => {
			debouncedUpdateQuantity.cancel();
		};
	}, [debouncedUpdateQuantity]);

	const handleQuantityChange = (amount: number) => {
		const newQuantity = Math.max(1, optimisticQuantity + amount);
		addOptimisticQuantity(amount);
		debouncedUpdateQuantity(product.id, newQuantity);
	};

	return (
		<Card className="flex items-center justify-between space-x-4 p-4">
			<img
				src={`http://localhost:8000${imageUrl}`}
				alt={name}
				className="h-24 w-24 rounded-md object-cover"
			/>
			<div className="flex flex-col space-y-2">
				<h2 className="font-semibold text-xl">{name}</h2>
				<p className="text-gray-500">{description}</p>
				<p className="font-semibold text-lg">
					Rp{price.toLocaleString("id-ID")}
				</p>
			</div>
			<div className="flex flex-col space-y-2">
				<div className="flex items-center space-x-2">
					<Counter
						quantity={optimisticQuantity}
						stock={stock}
						increment={1}
						enabled={false}
						handleDecrement={() => handleQuantityChange(-1)}
						handleIncrement={() => handleQuantityChange(1)}
						isPending={isPending}
					/>
				</div>
				<Button className={"px-4"} variant={"destructive"} disabled={isPending}>
					{isPending ? "Updating..." : "Remove"}
				</Button>
			</div>
		</Card>
	);
};

export default CartItem;
