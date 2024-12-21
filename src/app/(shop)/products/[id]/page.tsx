import ProductDetail from "@/app/(shop)/products/[id]/productDetail";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import type { Metadata } from "next";

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
		return {
			message: "Product not found",
		};
	}

	return <ProductDetail product={product.data} />;
};

export default Page;
