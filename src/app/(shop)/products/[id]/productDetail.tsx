import type { Product } from "@/app/lib/services/products";
import React from "react";
import AddToCart from "@/app/(shop)/products/[id]/_component/addToCart";

interface ProductDetailProps {
	product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
	return (
		<div className={"w-full grid-cols-1 gap-6 grid lg:grid-cols-6 lg:gap-8"}>
			<div className={"cols-span-1 lg:col-span-2 w-full"}>
				<img
					src={
						'https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"'
					}
					alt={product.name}
					className={
						"rounded-xl w-full h-full object-cover object-center drop-shadow-lg border-slate-900"
					}
				/>
			</div>
			<div className={"col-span-1 lg:col-span-2"}>
				<p className={"font-semibold text-md text-slate-900"}>Product Name</p>
				<h1 className={"text-md font-light mt-1"}>{product.name}</h1>
				<p className={"font-semibold text-md text-slate-900 mt-3"}>Price</p>
				<p className={"text-md font-light text-slate-800 mt-1"}>
					Rp{product.price.toLocaleString("id-ID")}
				</p>
				<p className={"font-semibold text-md text-slate-900 mt-3"}>
					Description
				</p>
				<p className={"text-md font-light text-slate-500 mt-1"}>
					{product.description}
				</p>
			</div>
			<AddToCart
				product={product}
				className={"w-full col-span-1 lg:col-span-2"}
			/>
		</div>
	);
};

export default ProductDetail;
