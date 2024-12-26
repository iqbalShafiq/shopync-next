"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import type { ProductProps } from "../../products/_component/productItem";
import Counter from "@/app/components/shared/counter";

interface CartItemProps extends ProductProps {
	quantityOnCart: number;
}

const CartItem = ({
	name,
	description,
	price,
	image,
	quantityOnCart,
	quantity: stock,
}: CartItemProps) => {
	return (
		<Card className="mt-2 flex items-center justify-between space-x-4 p-4">
			<img
				src={image}
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
						start={0}
						min={quantityOnCart}
						max={stock}
						increment={1}
						enabled={false}
						directEditEnabled={true}
					/>
				</div>
				<Button className={"px-4"} variant={"destructive"}>
					Remove
				</Button>
			</div>
		</Card>
	);
};

export default CartItem;
