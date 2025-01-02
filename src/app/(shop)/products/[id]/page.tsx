import ProductDetail from "@/app/(shop)/products/[id]/productDetail";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import type { Metadata } from "next";
import { cartService } from "@/app/lib/services/cart";

export const metadata: Metadata = {
	title: "Product Detail",
	description: "Product detail page for the shop",
};

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { id: productId } = await params;

	const product = await productService.getById(productId);
	if (hasErrorResult(product)) {
		throw new Error(product.message);
	}

	const productInCart = await cartService.getItems({
		productId,
	});
	if (hasErrorResult(productInCart)) {
		throw new Error(productInCart.message);
	}

	return (
		<ProductDetail
			productInCart={productInCart?.data[0]}
			product={product.data}
		/>
	);
};

export default Page;
