import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/shared/Button";

interface ProductProps {
	id: string;
	name: string;
	description: string;
	price: number;
	image: string;
}

const ProductItem = ({ id, name, description, price, image }: ProductProps) => {
	return (
		<div className="shadow-md hover:shadow-lg transition-all duration-300">
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
			<Button
				variant="primary"
				className="w-full py-3 rounded-t-none rounded-b-xl"
			>
				Add to Cart
			</Button>
		</div>
	);
};

export default ProductItem;
