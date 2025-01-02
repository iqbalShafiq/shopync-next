import DeleteProduct from "@/app/(shop)/products/delete/[id]/deleteProduct";
import Modal from "@/app/components/ui/modal";
import ModalWrapper from "@/app/components/ui/modal-wrapper";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

const Page = async ({ params }: PageProps) => {
	const { id: productId } = await params;
	return (
		<ModalWrapper expectedPath={`/products/delete/${productId}`}>
			<Modal title={"Delete Product"}>
				<DeleteProduct productId={productId} />
			</Modal>
		</ModalWrapper>
	);
};

export default Page;
