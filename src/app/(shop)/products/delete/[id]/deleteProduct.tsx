"use client";

import { Button } from "@/components/ui/button";
import InputText from "@/app/components/shared/inputText";
import { deleteProductAction } from "@/app/lib/actions/deleteProductAction";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { useRouter } from "next/navigation";

type DeleteProductProps = {
	productId: string;
};

const DeleteProduct = ({ productId }: DeleteProductProps) => {
	const { toast } = useToast();
	const router = useRouter();

	const initialState = {
		success: false,
		message: "",
	};

	const [formState, formAction] = React.useActionState(
		deleteProductAction,
		initialState,
	);

	React.useEffect(() => {
		if (formState.message !== "") {
			toast({
				variant: formState.success ? "default" : "destructive",
				title: formState.success ? "Success" : "Error",
				description: formState.message,
			});

			if (formState.success) {
				router.replace("/products/mine");
			}
		}
	}, [formState.message, formState.success, toast, router]);

	return (
		<form action={formAction} className={"flex flex-col"}>
			<h2 className={"w-full text-center font-medium text-lg text-slate-900"}>
				Are you sure to delete the product?
			</h2>
			<InputText
				id={"productId"}
				name={"productId"}
				type={"hidden"}
				value={productId}
			/>
			<Button type={"submit"} className={"mt-6"} variant={"destructive"}>
				Delete
			</Button>
		</form>
	);
};

export default DeleteProduct;
