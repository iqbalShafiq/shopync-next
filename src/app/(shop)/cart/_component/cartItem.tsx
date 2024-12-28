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
		startTransition(() => {
			const newQuantity = optimisticQuantity + amount;
			addOptimisticQuantity(amount);
			debouncedUpdateQuantity(product.id, newQuantity);
		});
	};

	return (
		<Card className="flex w-full flex-col items-start justify-between space-y-4 p-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
			<img
				src={`http://localhost:8000${imageUrl}`}
				alt={name}
				className="hidden h-24 w-24 rounded-md object-cover md:block"
			/>
			<div className="flex flex-1 flex-col space-y-2">
				<h2 className="font-semibold text-xl">{name}</h2>
				<p className="text-gray-500">
					{description.substring(0, Math.min(description.length, 50))}
				</p>
				<p className="font-semibold text-lg">
					Rp{price.toLocaleString("id-ID")}
				</p>
			</div>
			<div className="flex w-full flex-col items-center space-y-4 md:w-fit md:space-y-2">
				<Counter
					quantity={optimisticQuantity}
					stock={stock}
					increment={1}
					enabled={false}
					handleDecrement={() => handleQuantityChange(-1)}
					handleIncrement={() => handleQuantityChange(1)}
					isPending={isPending}
				/>
				<Button
					className={"w-full"}
					variant={"destructive"}
					disabled={isPending}
					onClick={() => handleQuantityChange(-quantity)}
				>
					{isPending ? "Updating..." : "Remove"}
				</Button>
			</div>
		</Card>
	);
};

export default CartItem;
