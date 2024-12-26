import DeleteProduct from "@/app/(shop)/products/delete/[id]/deleteProduct";
import Modal from "@/app/components/ui/modal";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { id: productId } = await params;
	return (
		<Modal title={"Delete Product"}>
			<DeleteProduct productId={productId} />
		</Modal>
	);
};

export default Page;
