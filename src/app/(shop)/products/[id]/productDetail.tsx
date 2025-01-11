import AddToCart from "@/app/(shop)/products/[id]/_component/addToCart";
import RelatedProducts from "@/app/(shop)/products/[id]/_component/relatedProducts";
import SellerCard from "@/app/(shop)/products/[id]/_component/sellerCard";
import HtmlContent from "@/app/components/shared/htmlContent";
import ImageViewer from "@/app/components/shared/imageViewer";
import { getUser } from "@/app/lib/context/AuthContext";
import type { ProductInCart } from "@/app/lib/services/cart";
import type { Product } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface ProductDetailProps {
	productInCart: ProductInCart;
	product: Product;
}

const ProductDetail = async ({
	productInCart,
	product,
}: ProductDetailProps) => {
	const user = await getUser();
	if (hasErrorResult(user)) {
		throw new Error(user.message);
	}
	const mine = user.data?.id === product.userId;

	return (
		<div className={"flex flex-col"}>
			<div className={"grid w-full grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-8"}>
				<aside className={"cols-span-1 w-full lg:col-span-2"}>
					<ImageViewer
						src={`http://localhost:8000${product.imageUrl}`}
						alt={product.name}
					/>

					{product.user && (
						<SellerCard className={"mt-8"} seller={product.user} />
					)}
				</aside>

				<main
					className={`col-span-1 ${mine ? "lg:col-span-4" : "lg:col-span-2"}`}
				>
					{/* Product name */}
					<p className={"font-semibold text-lg text-slate-900"}>
						{product.name}
					</p>

					{/* Price */}
					<p className={"mt-1 font-semibold text-2xl text-slate-800"}>
						Rp{product.price.toLocaleString("id-ID")}
					</p>

					{/* Categories */}
					<div className="mt-2 flex flex-wrap gap-2">
						{product.categories?.map((cat) => (
							<Badge variant={"secondary"} key={cat.category.id}>
								{cat.category.name}
							</Badge>
						))}
					</div>

					{/* Description */}
					<p className={"mt-3 font-semibold text-md text-slate-900"}>
						About this product
					</p>
					<HtmlContent
						showAsHtml={true}
						content={product.description}
						className="mt-1 max-w-none font-light text-md text-slate-800"
					/>
				</main>

				{/* Cart section */}
				{!mine && (
					<aside className={"col-span-1 w-full lg:col-span-2"}>
						<AddToCart
							quantityInCart={productInCart?.quantity}
							product={product}
						/>
					</aside>
				)}
			</div>

			<RelatedProducts product={product} />
		</div>
	);
};

export default ProductDetail;
