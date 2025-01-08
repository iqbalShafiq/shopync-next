import AddToCart from "@/app/(shop)/products/[id]/_component/addToCart";
import RelatedProducts from "@/app/(shop)/products/[id]/_component/relatedProducts";
import SellerCard from "@/app/(shop)/products/[id]/_component/sellerCard";
import HtmlContent from "@/app/components/shared/htmlContent";
import ImageViewer from "@/app/components/shared/imageViewer";
import type { ProductInCart } from "@/app/lib/services/cart";
import type { Product } from "@/app/lib/services/products";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProductDetailProps {
	productInCart: ProductInCart;
	product: Product;
}

const ProductDetail = async ({
	productInCart,
	product,
}: ProductDetailProps) => {
	return (
		<div className={"flex flex-col"}>
			<div className={"grid w-full grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-8"}>
				<aside className={"cols-span-1 w-full lg:col-span-2"}>
					<ImageViewer
						src={`http://localhost:8000${product.imageUrl}`}
						alt={product.name}
					/>

					{product.user && (
						<div>
							<div className={"mt-5 h-0 bg-gray-200"} />
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

					{/* Categories */}
					<p className={"mt-3 font-semibold text-md text-slate-900"}>
						Categories
					</p>
					<div className="mt-2 flex flex-wrap gap-2">
						{product.categories?.map((cat) => (
							<Badge variant={"secondary"} key={cat.category.id}>
								{cat.category.name}
							</Badge>
						))}
					</div>

					{/* Description */}
					<p className={"mt-3 font-semibold text-md text-slate-900"}>
						Description
					</p>
					<HtmlContent
						showAsHtml={true}
						content={product.description}
						className="mt-1 max-w-none font-light text-md text-slate-500"
					/>
				</main>

				{/* Cart section */}
				<aside className={"col-span-1 w-full lg:col-span-2"}>
					<AddToCart
						quantityInCart={productInCart?.quantity}
						product={product}
					/>
				</aside>
			</div>

			<RelatedProducts product={product} />
		</div>
	);
};

export default ProductDetail;
