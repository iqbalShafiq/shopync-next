"use client";

import HtmlContent from "@/app/components/shared/htmlContent";
import LinkButton from "@/app/components/shared/linkButton";
import upsertCartQuantityAction from "@/app/lib/actions/upsertCartQuantityAction";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export interface ProductProps {
	id: string;
	name: string;
	description: string;
	quantity: number;
	price: number;
	image: string;
	className?: string;
	mine: boolean;
}

const ProductItem = ({
	id,
	name,
	description,
	price,
	image,
	className,
	mine,
}: ProductProps) => {
	const [isPending, startTransition] = React.useTransition();
	const link = mine ? `/products/editor/${id}` : `/products/${id}`;

	const handleAddToCart = () => {
		startTransition(async () => {
			try {
				const result = await upsertCartQuantityAction(id, 1, true);

				if ("error" in result) {
					toast({
						variant: "destructive",
						title: "Error",
						description: result.error,
					});
				} else {
					toast({
						title: "Success",
						description: "Item added to cart successfully",
					});
				}
			} catch (error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Failed to add item to cart",
				});
			}
		});
	};

	return (
		<div
			className={cn(
				"flex flex-col justify-between rounded-b-md shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg",
				className,
			)}
		>
			<Link href={link} className={"flex h-full flex-col"}>
				<img
					src={image}
					alt={name}
					className="h-48 w-full rounded-t-md object-cover drop-shadow-md"
				/>
				<div className="flex flex-1 flex-col items-baseline justify-between px-4 py-6">
					<div>
						<h2 className="font-medium text-lg">{name}</h2>
						<HtmlContent
							className={"font-light text-slate-500"}
							showAsHtml={false}
							content={description}
							limitCharacter={100}
						/>
					</div>
					<p className="mt-2 font-semibold text-lg">
						Rp{price.toLocaleString("id-ID")}
					</p>
				</div>
			</Link>
			{mine ? (
				<LinkButton
					href={`/products/editor/${id}`}
					className="w-full rounded-t-none rounded-b-md py-3"
					variant={"default"}
				>
					Edit
				</LinkButton>
			) : (
				<Button
					className="w-full rounded-t-none rounded-b-md py-3"
					variant={"default"}
					onClick={(e) => {
						e.preventDefault();
						handleAddToCart();
					}}
					disabled={isPending}
				>
					{isPending ? "Adding to cart..." : "Add to cart"}
				</Button>
			)}
		</div>
	);
};

export default ProductItem;
