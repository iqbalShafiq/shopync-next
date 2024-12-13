"use client";

import type { ProductProps } from "../../products/_component/ProductItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

interface CartItemProps extends ProductProps {
	quantityOnCart: number;
}

const CartItem = ({
	name,
	description,
	price,
	image,
	quantityOnCart,
	quantity,
	onActionClick,
}: CartItemProps) => {
	const [itemQuantity, setItemQuantity] = React.useState(quantityOnCart);

	React.useEffect(() => {
		const handler = setTimeout(() => {
			console.log("Debounced Quantity:", itemQuantity);
		}, 1_000);

		return () => {
			clearTimeout(handler);
		};
	}, [itemQuantity]);

	function addQuantity() {
		setItemQuantity(itemQuantity + 1);
	}

	function subtractQuantity() {
		setItemQuantity(itemQuantity - 1);
	}

	return (
		<Card className="p-4 flex items-center justify-between space-x-4 mt-2">
			<img
				src={image}
				alt={name}
				className="w-24 h-24 object-cover rounded-md"
			/>
			<div className="flex flex-col space-y-2">
				<h2 className="text-xl font-semibold">{name}</h2>
				<p className="text-gray-500">{description}</p>
				<p className="text-lg font-semibold">
					Rp{price.toLocaleString("id-ID")}
				</p>
			</div>
			<div className="flex flex-col space-y-2">
				<div className="flex items-center space-x-2">
					<Button
						disabled={itemQuantity === 1}
						onClick={subtractQuantity}
						variant={"outline"}
						className={"px-2"}
						size={"icon"}
					>
						<MinusIcon />
					</Button>
					<p className="text-lg font-semibold select-none">{itemQuantity}</p>
					<Button
						disabled={itemQuantity === quantity}
						onClick={addQuantity}
						variant={"outline"}
						className={"px-2"}
						size={"icon"}
					>
						<PlusIcon />
					</Button>
				</div>
				<Button onClick={onActionClick} className={"px-4"}>
					Remove
				</Button>
			</div>
		</Card>
	);
};

export default CartItem;
