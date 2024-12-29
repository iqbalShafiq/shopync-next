"use client";

import BorderlessInputText from "@/app/components/shared/borderlessInputText";
import InputFile from "@/app/components/shared/inputFile";
import InputText from "@/app/components/shared/inputText";
import { upsertProductAction } from "@/app/lib/actions/upsertProductAction";
import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { LucideTrash } from "lucide-react";
import Link from "next/link";
import React, { useActionState } from "react";

type ProductEditorProps = {
	product?: Product;
};

const ProductEditor = ({ product }: ProductEditorProps) => {
	const initialState = {
		message: "",
		name: "",
		description: "",
		price: 0,
		quantity: 0,
		userId: "",
	};

	const [formState, formAction] = useActionState(
		upsertProductAction,
		initialState,
	);

	return (
		<main className={"flex flex-1 flex-col"}>
			<form
				action={formAction}
				className={"grid flex-1 grid-cols-1 lg:grid-cols-3 lg:space-x-6"}
			>
				<InputFile
					name={"image"}
					id={"image"}
					className={"col-span-1 lg:h-1/2"}
					imageUrl={product?.imageUrl}
				/>

				<div
					className={
						"col-span-1 mt-4 flex flex-1 flex-col lg:col-span-2 lg:mt-0"
					}
				>
					{product?.id && (
						<InputText
							name={"id"}
							id={"id"}
							type={"hidden"}
							defaultValue={product?.id}
						/>
					)}
					<div>
						<BorderlessInputText
							label={"Product Name"}
							labelFontWeight={"semibold"}
							defaultValue={formState.name || product?.name}
							required={true}
							placeholder={"Product Name"}
							type={"text"}
							id={"name"}
							name={"name"}
						/>
					</div>

					<div className={"mt-3 mr-0 mb-4 w-full md:mr-8 md:mb-0"}>
						<BorderlessInputText
							label={"Price"}
							labelFontWeight={"semibold"}
							defaultValue={formState.price || product?.price}
							type={"number"}
							name={"price"}
							id={"price"}
							required={true}
							placeholder={"Rp1.000.000"}
							prefix={"88"}
						/>
					</div>

					<div className={"mt-3 mb-4 w-full md:mb-0"}>
						<BorderlessInputText
							label={"Stock"}
							labelFontWeight={"semibold"}
							defaultValue={formState.quantity || product?.quantity}
							type={"number"}
							name={"quantity"}
							id={"quantity"}
							required={true}
							placeholder={"100"}
						/>
					</div>

					<div className={"mt-3 mb-4 flex flex-1 flex-col"}>
						<RichTextEditor
							label={"Product Description"}
							labelFontWeight={"semibold"}
							defaultValue={formState.description || product?.description}
							name={"description"}
							id={"description"}
							required={true}
							placeholder={"Type here ..."}
						/>
					</div>
					<div
						className={"mt-8 flex w-full items-center justify-end space-x-3"}
					>
						{product?.id && (
							<Link href={`/products/delete/${product?.id}`} tabIndex={-1}>
								<Button type={"button"} variant={"destructive"} size={"icon"}>
									<LucideTrash />
								</Button>
							</Link>
						)}

						<Button type={"submit"} className={"w-full md:w-1/4"}>
							{product?.id ? "Update Product" : "Add Product"}
						</Button>
					</div>
				</div>
			</form>
		</main>
	);
};

export default ProductEditor;
