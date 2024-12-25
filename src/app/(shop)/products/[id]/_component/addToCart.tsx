"use client";

import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

interface AddToCartProps {
	product: Product;
	className?: string;
}

const AddToCart = ({ product, className }: AddToCartProps) => {
	const [quantity, setQuantity] = React.useState(1);

	const handleAdd = () => {
		setQuantity(quantity + 1);
	};

	const handleSubtract = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
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
						<Button
							type={"button"}
							variant={"outline"}
							size={"icon"}
							className={"bg-transparent"}
							disabled={quantity === 1}
							onClick={handleSubtract}
						>
							<MinusIcon width={20} />
						</Button>
						<p className={"select-none font-semibold text-slate-900 text-xl"}>
							{quantity}
						</p>
						<Button
							type={"button"}
							variant={"default"}
							size={"icon"}
							disabled={quantity === product.quantity}
							onClick={handleAdd}
						>
							<PlusIcon width={20} />
						</Button>
					</div>

					<div className={"flex items-center justify-start space-x-2"}>
						<h3 className={"font-light text-sm"}>Stock:</h3>
						<p className={"font-semibold text-md"}>{product.quantity}</p>
					</div>
				</div>
				<div className={"mt-4"}>
					<h3 className={"font-medium text-sm"}>Subtotal</h3>
					<p className={"mt-1 font-semibold text-xl"}>
						Rp{(product.price * quantity).toLocaleString("id-ID")}
					</p>
				</div>
				<Button
					className={
						"mt-4 w-full rounded-md bg-slate-900 px-4 py-2 font-semibold text-white"
					}
				>
					Add to Cart
				</Button>
			</Card>
		</aside>
	);
};

export default AddToCart;
