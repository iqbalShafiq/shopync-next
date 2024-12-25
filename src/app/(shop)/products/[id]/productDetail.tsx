import AddToCart from "@/app/(shop)/products/[id]/_component/addToCart";
import SellerCard from "@/app/(shop)/products/[id]/_component/sellerCard";
import ImageViewer from "@/app/components/shared/imageViewer";
import type { Product } from "@/app/lib/services/products";
import React from "react";

interface ProductDetailProps {
	product: Product;
}

const ProductDetail = async ({ product }: ProductDetailProps) => {
	return (
		<div className={"grid w-full grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-8"}>
			<aside className={"cols-span-1 w-full lg:col-span-2"}>
				<ImageViewer
					src={
						'https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"'
					}
					alt={product.name}
				/>

				{product.user && (
					<div>
						<div className={"mt-5 h-0.5 bg-gray-200"} />
						<SellerCard seller={product.user} className={"mt-4"} />
					</div>
				)}
			</aside>

			<main className={"col-span-1 lg:col-span-2"}>
				{/* Product name */}
				<p className={"font-semibold text-md text-slate-900"}>Product Name</p>
				<h1 className={"mt-1 font-light text-md"}>{product.name}</h1>

				{/* Price */}
				<p className={"mt-3 font-semibold text-md text-slate-900"}>Price</p>
				<p className={"mt-1 font-light text-md text-slate-800"}>
					Rp{product.price.toLocaleString("id-ID")}
				</p>

				{/* Description */}
				<p className={"mt-3 font-semibold text-md text-slate-900"}>
					Description
				</p>
				<p className={"mt-1 font-light text-md text-slate-500"}>
					{product.description}
				</p>
			</main>

			{/* Cart section */}
			<aside className={"col-span-1 w-full lg:col-span-2"}>
				<AddToCart product={product} />
			</aside>
		</div>
	);
};

export default ProductDetail;
