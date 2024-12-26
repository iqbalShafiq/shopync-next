"use client";

import LinkButton from "@/app/components/shared/linkButton";
import Link from "next/link";
import React from "react";

export interface ProductProps {
	id: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	image: string;
	className?: string;
	mine: boolean;
}

const ProductItem = ({
	id,
	name,
	description,
	price,
	image,
	className,
	mine,
}: ProductProps) => {
	const link = mine ? `/products/editor/${id}` : `/products/${id}`;

	return (
		<div
			className={`flex flex-col justify-between rounded-b-xl shadow-md transition-all duration-300 hover:shadow-lg ${className}`}
		>
			<Link href={link} className={"flex h-full flex-col"}>
				<img
					src={image}
					alt={name}
					className="h-48 w-full rounded-t-xl object-cover"
				/>
				<div className="flex flex-1 flex-col items-baseline justify-between p-6">
					<div>
						<h2 className="font-semibold text-xl">{name}</h2>
						<p className="text-gray-500">
							{description.length > 100
								? `${description.substring(0, 100)}...`
								: description}
						</p>
					</div>
					<p className="mt-2 font-semibold text-lg">
						Rp{price.toLocaleString("id-ID")}
					</p>
				</div>
			</Link>
			<LinkButton
				href={mine ? `/products/editor/${id}` : `/products/${id}`}
				className="w-full rounded-t-none rounded-b-xl py-3"
				variant={"default"}
			>
				{mine ? "Edit" : "Add to cart"}
			</LinkButton>
		</div>
	);
};

export default ProductItem;
