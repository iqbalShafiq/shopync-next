import ProductEditor from "@/app/(shop)/products/editor/productEditor";
import { getUser } from "@/app/lib/context/AuthContext";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import type { Metadata } from "next";
import { categoryService } from "@/app/lib/services/categories";

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
	const categories = await categoryService.getAll();
	const user = await getUser();

	if (hasErrorResult(product)) {
		throw new Error(product.message);
	}

	if (hasErrorResult(categories)) {
		throw new Error(categories.message);
	}

	if (hasErrorResult(user)) {
		throw new Error(user.message);
	}

	if (product.data.userId !== user.data.id) {
		return {
			message: "Unauthorized",
		};
	}

	return <ProductEditor product={product.data} categories={categories.data} />;
};

export default Page;
