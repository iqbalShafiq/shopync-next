"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { Product } from "@/app/lib/services/products";

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
			<h3 className={"text-md font-semibold"}>Add to Cart</h3>
			<Card
				className={`rounded-xl mt-3 lg:px-6 lg:py-5 bg-transparent shadow-none border-none lg:border-1 border-slate-900 lg:shadow ${className}`}
			>
				<div className={"flex items-center justify-start space-x-4"}>
					<div className={"flex justify-start items-center space-x-4"}>
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
						<p className={"text-xl font-semibold text-slate-900 select-none"}>
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

					<div className={"flex justify-start items-center space-x-2"}>
						<h3 className={"text-sm font-light"}>Stock:</h3>
						<p className={"text-md font-semibold"}>{product.quantity}</p>
					</div>
				</div>
				<div className={"mt-4"}>
					<h3 className={"text-sm font-medium"}>Subtotal</h3>
					<p className={"text-xl font-semibold mt-1"}>
						Rp{(product.price * quantity).toLocaleString("id-ID")}
					</p>
				</div>
				<Button
					className={
						"bg-slate-900 w-full text-white font-semibold px-4 py-2 rounded-md mt-4"
					}
				>
					Add to Cart
				</Button>
			</Card>
		</aside>
	);
};

export default AddToCart;
