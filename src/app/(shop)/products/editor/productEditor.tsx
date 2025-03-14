"use client";

import BorderlessInputText from "@/app/components/shared/borderlessInputText";
import InputFile from "@/app/components/shared/inputFile";
import InputText from "@/app/components/shared/inputText";
import { createCategoryAction } from "@/app/lib/actions/createCategoryAction";
import { upsertProductAction } from "@/app/lib/actions/upsertProductAction";
import type { Category } from "@/app/lib/services/categories";
import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiCombobox } from "@/components/ui/multi-combobox";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { toast } from "@/hooks/use-toast";
import { LucideTrash } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useActionState } from "react";

type ProductEditorProps = {
	product?: Product;
	categories: Category[];
};

const ProductEditor = ({ product, categories }: ProductEditorProps) => {
	const existingCategories =
		product?.categories?.map((data) => {
			return { value: data.category.name, label: data.category.name };
		}) || [];

	const [selectedCategories, setSelectedCategories] =
		React.useState<Array<{ value: string; label: string }>>(existingCategories);

	const categoryOptions = (categories || []).map((category) => ({
		value: category.name,
		label: category.name,
	}));

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

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		show: {
			opacity: 1,
			x: 0,
			transition: {
				type: "spring",
				duration: 0.5,
			},
		},
	};

	const buttonVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		show: {
			opacity: 1,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 200,
				delay: 0.5,
			},
		},
		hover: {
			scale: 1.05,
			transition: { type: "spring", stiffness: 400 },
		},
	};

	const [isPending, startTransition] = React.useTransition();
	const handleCreateCategory = (categoryName: string) => {
		startTransition(async () => {
			try {
				const response = await createCategoryAction(categoryName);

				if (!response.success || response.newCategory === undefined) {
					toast({
						title: "Failed to create category",
						description: response.error,
						variant: "destructive",
					});
					return;
				}

				// Add the new category to the options
				const newCategory = response.newCategory;

				// Update selected categories to include the new one
				setSelectedCategories([...selectedCategories, newCategory]);

				toast({
					title: "Category created successfully",
					description: `Category ${response.newCategory.value} has been created.`,
				});
			} catch (error) {
				toast({
					title: "Failed to create category",
					description: "An error occurred while creating the category.",
					variant: "destructive",
				});
				console.error(error);
			}
		});
	};

	return (
		<motion.main
			initial="hidden"
			animate="show"
			className={"flex flex-1 flex-col"}
		>
			<motion.form
				variants={formVariants}
				action={formAction}
				className={"grid flex-1 grid-cols-1 lg:grid-cols-3 lg:space-x-6"}
			>
				<motion.div variants={itemVariants} className={"col-span-1 lg:h-1/2"}>
					<InputFile
						name={"image"}
						id={"image"}
						className={"w-full"}
						imageUrl={product?.imageUrl}
					/>
				</motion.div>

				<motion.div
					variants={itemVariants}
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
					<motion.div
						variants={itemVariants}
						className={"mr-0 mb-4 w-full md:mr-8 md:mb-0"}
					>
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
					</motion.div>

					<motion.div
						variants={itemVariants}
						className={"mt-3 mr-0 mb-4 w-full md:mr-8 md:mb-0"}
					>
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
					</motion.div>

					<motion.div
						variants={itemVariants}
						className={"mt-3 mb-4 w-full md:mb-0"}
					>
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
					</motion.div>

					<motion.div
						variants={itemVariants}
						className="mt-3 mb-4 flex w-full flex-col md:mb-0"
					>
						<Label className={"block font-semibold text-slate-900 text-sm"}>
							Categories
						</Label>
						<MultiCombobox
							options={categoryOptions}
							selected={selectedCategories}
							onChangeAction={setSelectedCategories}
							onCreateOption={(categoryName) =>
								handleCreateCategory(categoryName)
							}
							placeholder="Select categories..."
							className="mt-3"
						/>

						{/* Hidden input to send categories data */}
						<input
							type="hidden"
							name="categories"
							value={JSON.stringify(
								selectedCategories.map((category) => ({
									name: category.value,
								})),
							)}
						/>
					</motion.div>

					<motion.div
						variants={itemVariants}
						className={"mt-3 mb-4 flex flex-1 flex-col"}
					>
						<RichTextEditor
							label={"Product Description"}
							labelFontWeight={"semibold"}
							defaultValue={formState.description || product?.description}
							name={"description"}
							id={"description"}
							required={true}
							placeholder={"Type here ..."}
						/>
					</motion.div>
					<motion.div
						variants={itemVariants}
						className={
							"mt-8 flex w-full flex-col items-center justify-end space-y-4 md:flex-row md:space-x-3 md:space-y-0"
						}
					>
						{product?.id && (
							<Link href={`/products/delete/${product?.id}`} tabIndex={-1}>
								<motion.div variants={buttonVariants} whileHover="hover">
									<Button type={"button"} variant={"destructive"} size={"icon"}>
										<LucideTrash />
									</Button>
								</motion.div>
							</Link>
						)}

						<motion.div
							variants={buttonVariants}
							whileHover="hover"
							className={"w-full md:w-1/4"}
						>
							<Button type={"submit"} className={"w-full"}>
								{product?.id ? "Update Product" : "Add Product"}
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			</motion.form>
		</motion.main>
	);
};

export default ProductEditor;
