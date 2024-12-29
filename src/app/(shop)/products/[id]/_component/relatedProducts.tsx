import Products from "@/app/(shop)/products/products";
import { type Product, productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import React from "react";

interface RelatedProductsProps {
	product: Product;
}

const RelatedProducts = async ({ product }: RelatedProductsProps) => {
	const { userId: sellerId, id: productId } = product;
	const result = await productService.get({
		userId: sellerId,
		excludedProductId: productId,
	});

	if (hasErrorResult(result)) {
		return <div />;
	}

	return (
		<div className={result.data.length === 0 ? "hidden" : "block"}>
			<div className={"-mx-8 mt-8 mb-7 h-0.5 bg-gray-200 drop-shadow-sm"} />
			<div>
				<Products
					pagination={false}
					title={"Related Products"}
					userId={sellerId}
					excludedProductId={productId}
				/>
			</div>
		</div>
	);
};

export default RelatedProducts;
