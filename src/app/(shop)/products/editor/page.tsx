import ProductEditor from "@/app/(shop)/products/editor/productEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Add Product",
	description: "Add product",
};

const Page = () => <ProductEditor />;
export default Page;
