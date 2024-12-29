import Products from "@/app/(shop)/products/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Products",
	description: "Product list page",
};

const Page = async (props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		limit?: string;
		userId?: string;
	}>;
}) => <Products searchParams={props.searchParams} />;

export default Page;
