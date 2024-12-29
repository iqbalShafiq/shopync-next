import ProductEditor from "@/app/(shop)/products/editor/productEditor";
import { getUser } from "@/app/lib/context/AuthContext";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Product Editor",
	description: "Product Editor",
};

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { id: productId } = await params;
	const product = await productService.getById(productId);
	const user = await getUser();

	if (hasErrorResult(product)) {
		return {
			message: "Product not found",
		};
	}

	if (hasErrorResult(user)) {
		return {
			message: "User not found",
		};
	}

	if (product.data.userId !== user.data.id) {
		return {
			message: "Unauthorized",
		};
	}

	return <ProductEditor product={product.data} />;
};

export default Page;
