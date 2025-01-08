import SellerDetail from "@/app/(shop)/sellers/[id]/sellerDetail";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Seller Profile",
	description: "Seller profile page",
};

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { id: userId } = await params;
	const products = await productService.get({
		userId,
	});

	if (hasErrorResult(products)) {
		throw new Error(products.message);
	}

	const product = await productService.getById(products?.data[0]?.id);
	if (hasErrorResult(product)) {
		throw new Error(product.message);
	}

	return <SellerDetail seller={product.data.user} productResult={products} />;
};

export default Page;