"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface ProductProps {
	id: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	image: string;
	className?: string;
}

const ProductItem = ({
	id,
	name,
	description,
	price,
	image,
	className,
}: ProductProps) => {
	return (
		<div
			className={`rounded-b-xl shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
		>
			<Link href={`/products/${id}`}>
				<img
					src={image}
					alt={name}
					className="w-full h-48 object-cover rounded-t-xl"
				/>
				<div className="p-6">
					<h2 className="text-xl font-semibold">{name}</h2>
					<p className="text-gray-500">{description}</p>
					<p className="text-lg font-semibold mt-2">
						Rp{price.toLocaleString("id-ID")}
					</p>
				</div>
			</Link>
			<Button className="w-full py-3 rounded-t-none rounded-b-xl">
				Add to Cart
			</Button>
		</div>
	);
};

export default ProductItem;
