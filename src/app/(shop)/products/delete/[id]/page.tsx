import DeleteProduct from "@/app/(shop)/products/delete/[id]/deleteProduct";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { id: productId } = await params;
	return <DeleteProduct productId={productId} />;
};

export default Page;
