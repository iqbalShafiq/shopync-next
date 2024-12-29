import Products from "@/app/(shop)/products/products";
import { authService } from "@/app/lib/services/auth";
import { hasErrorResult } from "@/app/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "My Products",
	description: "My Products",
};

const Page = async (props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		limit?: string;
		userId?: string;
	}>;
}) => {
	const user = await authService.me();

	if (hasErrorResult(user)) {
		throw Error("User not found");
	}

	return (
		<Products
			searchParams={props.searchParams}
			userId={user.data.id}
			mine={true}
		/>
	);
};

export default Page;
