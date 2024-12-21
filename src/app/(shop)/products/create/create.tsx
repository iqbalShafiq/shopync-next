"use client";

import React, { useActionState } from "react";
import { addProductAction } from "@/app/lib/actions/addProductAction";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import BorderlessInputText from "@/app/components/shared/borderlessInputText";
import BorderlessTextArea from "@/app/components/shared/borderlessTextArea";

const Create = () => {
	const initialState = {
		message: "",
		name: "",
		description: "",
		price: 0,
		quantity: 0,
		userId: "",
	};

	const [formState, formAction] = useActionState(
		addProductAction,
		initialState,
	);

	return (
		<main>
			<form
				action={formAction}
				className={"grid grid-cols-1 lg:grid-cols-3 lg:space-x-6"}
			>
				<div
					className={
						"relative rounded-xl col-span-1 border-slate-400 hover:bg-white/30 transition-all border-4 border-dotted flex justify-center items-center mb-8 h-full py-12"
					}
				>
					<Input
						type={"file"}
						name={"image"}
						id={"image"}
						className={
							"w-full h-full p-0 opacity-0 absolute cursor-pointer top-0 bottom-0 right-0 left-0"
						}
					/>
					<div className={"flex flex-col items-center space-y-2"}>
						<PlusIcon size={32} className={"text-slate-400"} />
						<p className={"w-full flex-1 font-light text-slate-400 text-lg"}>
							Add Product Image
						</p>
					</div>
				</div>

				<div className={"col-span-1 lg:col-span-2 mt-4 lg:mt-0"}>
					<div>
						<BorderlessInputText
							label={"Product Name"}
							labelFontWeight={"semibold"}
							defaultValue={formState.name}
							required={true}
							placeholder={"Product Name"}
							type={"text"}
							id={"name"}
							name={"name"}
						/>
					</div>

					<div className={"mt-2 mb-4 w-full md:mb-0 mr-0 md:mr-8"}>
						<BorderlessInputText
							label={"Price"}
							labelFontWeight={"semibold"}
							type={"number"}
							name={"price"}
							id={"price"}
							required={true}
							placeholder={"Rp1.000.000"}
							prefix={"88"}
						/>
					</div>

					<div className={"mt-2 mb-4 w-full md:mb-0"}>
						<BorderlessInputText
							label={"Stock"}
							labelFontWeight={"semibold"}
							type={"number"}
							name={"quantity"}
							id={"quantity"}
							required={true}
							placeholder={"100"}
						/>
					</div>

					<div className={"mt-2 mb-4"}>
						<BorderlessTextArea
							label={"Product Description"}
							labelFontWeight={"semibold"}
							name={"description"}
							id={"description"}
							required={true}
							defaultValue={formState.description}
							placeholder={"Type here ..."}
							rows={4}
						/>
					</div>
					<div className={"w-full text-right mt-8"}>
						<Button type={"submit"} className={"w-full md:w-1/4"}>
							Add Product
						</Button>
					</div>
				</div>
			</form>
		</main>
	);
};

export default Create;
