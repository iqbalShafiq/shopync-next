import ProductEditor from "@/app/(shop)/products/editor/productEditor";
import type { Metadata } from "next";
import { categoryService } from "@/app/lib/services/categories";
import { hasErrorResult } from "@/app/lib/utils";

export const metadata: Metadata = {
	title: "Add Product",
	description: "Add product",
};

const Page = async () => {
	const categories = await categoryService.getAll();
	if (hasErrorResult(categories)) {
		throw new Error(categories.message);
	}

	return <ProductEditor categories={categories.data} />;
};
export default Page;
