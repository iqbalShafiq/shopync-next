"use client";

import InputText from "@/app/components/shared/InputText";
import React, { useActionState } from "react";
import { addProductAction } from "@/app/lib/actions/addProductAction";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/app/components/shared/Button";

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
		<div>
			<form action={formAction}>
				<div className={"mb-4"}>
					<InputText
						defaultValue={formState.name}
						required={true}
						className={
							"font-medium text-slate-800 text-xl md:text-2xl placeholder:text-xl md:placeholder:text-2xl"
						}
						placeholder={"Product Name"}
						type={"text"}
						id={"name"}
						name={"name"}
					/>
				</div>
				<div className={"mb-4"}>
					<label
						htmlFor={"description"}
						className={"block text-sm font-semibold text-slate-900"}
					>
						Description
					</label>

					<Textarea
						name={"description"}
						id={"description"}
						className={
							"mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
						}
						required={true}
						defaultValue={formState.description}
					/>
				</div>
				<div className={"md:flex block justify-between"}>
					<div className={"mb-4 w-full md:mb-0 mr-0 md:mr-8"}>
						<Label className={"font-semibold"} htmlFor={"price"}>
							Price
						</Label>
						<Input
							type={"number"}
							name={"price"}
							id={"price"}
							required={true}
							defaultValue={formState.price}
							className={
								"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
							}
						/>
					</div>

					<div className={"mb-4 w-full md:mb-0"}>
						<Label className={"font-semibold"} htmlFor={"quantity"}>
							Quantity
						</Label>
						<Input
							type={"number"}
							name={"quantity"}
							id={"quantity"}
							required={true}
							defaultValue={formState.quantity}
							className={
								"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-slate-900 focus:ring focus:ring-slate-900 focus:ring-opacity-50"
							}
						/>
					</div>
				</div>
				<div className={"w-full text-right mt-8"}>
					<Button
						type={"submit"}
						className={"w-full md:w-1/4"}
						variant={"primary"}
					>
						Add Product
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Create;
