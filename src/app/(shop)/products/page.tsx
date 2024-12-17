import Products from "@/app/(shop)/products/products";

const Page = async (props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		limit?: string;
		userId?: string;
	}>;
}) => <Products searchParams={props.searchParams} />;

export default Page;
