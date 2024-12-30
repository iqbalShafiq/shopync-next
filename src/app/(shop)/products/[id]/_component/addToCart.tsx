"use client";

import Counter from "@/app/components/shared/counter";
import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import upsertCartQuantityAction from "@/app/lib/actions/upsertCartQuantityAction";

interface AddToCartProps {
	quantityInCart?: number;
	product: Product;
	className?: string;
}

const AddToCart = ({ quantityInCart, product, className }: AddToCartProps) => {
	const router = useRouter();
	const [quantity, setQuantity] = React.useState(1);
	const [isPending, startTransition] = React.useTransition();

	const handleOnItemAddedToCart = React.useCallback(() => {
		startTransition(async () => {
			try {
				const result = await upsertCartQuantityAction(
					product.id,
					quantity,
					true,
				);

				if (result.success) {
					toast({
						title: "Success",
						description: "Item added to cart successfully",
					});
					setQuantity(1);
					router.push("/cart");
				} else {
					toast({
						variant: "destructive",
						title: "Error",
						description: result.error,
					});
				}
			} catch (error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Failed to update quantity",
				});
			}
		});
	}, [quantity, router, product.id]);

	const handleIncrement = () => {
		if (quantity === product.quantity) {
			return;
		}

		setQuantity(quantity + 1);
	};

	const handleDecrement = () => {
		if (quantity === 1) {
			return;
		}

		setQuantity(quantity - 1);
	};

	return (
		<aside className={className}>
			<h3 className={"font-semibold text-md"}>Add to Cart</h3>
			<Card
				className={cn(
					"mt-3 rounded-xl border-slate-900 border-none bg-transparent shadow-none lg:border-1 lg:px-6 lg:py-5 lg:shadow",
					className,
				)}
			>
				<div className={"flex items-center justify-start space-x-4"}>
					<div className={"flex items-center justify-start space-x-4"}>
						<Counter
							quantity={quantity}
							stock={product.quantity}
							increment={1}
							enabled={isPending}
							handleIncrement={handleIncrement}
							handleDecrement={handleDecrement}
							isPending={isPending}
						/>
					</div>

					<div className={"flex items-center justify-start space-x-2"}>
						<h3 className={"font-light text-sm"}>Stock:</h3>
						<p className={"font-semibold text-md"}>{product.quantity}</p>
					</div>
				</div>
				<div className={"mt-4"}>
					{quantityInCart && (
						<p className={"mb-2 text-start font-light text-slate-500 text-sm"}>
							{quantityInCart} items in your cart
						</p>
					)}
					<h3 className={"font-medium text-sm"}>Subtotal</h3>
					<p className={"mt-1 font-semibold text-xl"}>
						Rp{(product.price * quantity).toLocaleString("id-ID")}
					</p>
				</div>
				<Button
					className={
						"mt-4 w-full rounded-md bg-slate-900 px-4 py-2 font-semibold text-white"
					}
					disabled={isPending}
					onClick={handleOnItemAddedToCart}
				>
					{isPending ? "Adding to cart..." : "Add to Cart"}
				</Button>
			</Card>
		</aside>
	);
};

export default AddToCart;
