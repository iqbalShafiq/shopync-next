import { Button } from "@/components/ui/button";
import InputText from "@/app/components/shared/inputText";

type DeleteProductProps = {
	productId: string;
};

const DeleteProduct = ({ productId }: DeleteProductProps) => {
	return (
		<form className={"flex flex-col"}>
			<h2 className={"w-full text-center font-medium text-lg text-slate-900"}>
				Are you sure to delete the product?
			</h2>
			<InputText
				id={"productId"}
				name={"productId"}
				type={"hidden"}
				value={productId}
			/>
			<Button className={"mt-6"} variant={"destructive"}>
				Delete
			</Button>
		</form>
	);
};

export default DeleteProduct;
