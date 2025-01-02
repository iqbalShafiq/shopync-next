"use client";

import Counter from "@/app/components/shared/counter";
import HtmlContent from "@/app/components/shared/htmlContent";
import upsertCartQuantityAction from "@/app/lib/actions/upsertCartQuantityAction";
import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import debounce from "lodash/debounce";
import React from "react";
import { motion } from "motion/react";

interface CartItemProps {
	quantity: number;
	product: Product;
}

const cartItemVariants = {
	hidden: {
		opacity: 0,
		x: -20,
		scale: 0.8,
	},
	visible: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			type: "spring",
			duration: 0.5,
		},
	},
	exit: {
		opacity: 0,
		x: -20,
		scale: 0.8,
		transition: {
			duration: 0.2,
		},
	},
};

const CartItem = ({ quantity, product }: CartItemProps) => {
	const { name, description, price, imageUrl, quantity: stock } = product;

	const [localQuantity, setLocalQuantity] = React.useState(quantity);
	const [isPending, startTransition] = React.useTransition();
	const lastSavedQuantity = React.useRef(quantity);

	const debouncedUpdateQuantity = React.useCallback(
		debounce((itemId: string, newQuantity: number) => {
			startTransition(async () => {
				try {
					const result = await upsertCartQuantityAction(
						itemId,
						newQuantity,
						false,
					);

					if (result.success) {
						lastSavedQuantity.current = newQuantity;
						toast({
							title: "Success",
							description:
								newQuantity === 0
									? "Item removed from cart successfully"
									: "Item updated from cart successfully",
						});
					} else {
						toast({
							variant: "destructive",
							title: "Error",
							description: result.error,
						});
						setLocalQuantity(lastSavedQuantity.current);
					}
				} catch (error) {
					toast({
						variant: "destructive",
						title: "Error",
						description: "Failed to update quantity",
					});
					setLocalQuantity(lastSavedQuantity.current);
				}
			});
		}, 800),
		[],
	);

	React.useEffect(() => {
		return () => {
			debouncedUpdateQuantity.cancel();
		};
	}, [debouncedUpdateQuantity]);

	const handleQuantityChange = (amount: number) => {
		const newQuantity = Math.max(1, Math.min(stock, localQuantity + amount));
		setLocalQuantity(newQuantity);
		debouncedUpdateQuantity(product.id, newQuantity);
	};

	const handleRemove = () => {
		setLocalQuantity(0);
		debouncedUpdateQuantity(product.id, 0);
	};

	return (
		<motion.div
			layout
			variants={cartItemVariants}
			initial="hidden"
			animate="visible"
			className={"w-full"}
			exit="exit"
		>
			<Card className="flex w-full flex-col items-start justify-between space-y-4 rounded-md p-4 md:flex-row md:items-center md:space-x-8 md:space-y-0">
				<motion.img
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					src={`http://localhost:8000${imageUrl}`}
					alt={name}
					className="hidden h-24 w-24 rounded-md object-cover md:block"
				/>
				<div className="flex flex-1 flex-col space-y-2">
					<h2 className="font-semibold text-xl">{name}</h2>
					<HtmlContent
						className={"text-slate-500"}
						showAsHtml={false}
						content={description}
						limitCharacter={100}
					/>
					<p className="font-semibold text-lg">
						Rp{(price * localQuantity).toLocaleString("id-ID")}
					</p>
				</div>
				<div className="flex w-full flex-col items-center space-y-4 md:w-fit md:space-y-2">
					<Counter
						quantity={localQuantity}
						stock={stock}
						increment={1}
						enabled={isPending}
						handleDecrement={() => handleQuantityChange(-1)}
						handleIncrement={() => handleQuantityChange(1)}
						isPending={isPending}
					/>
					<Button
						className={"w-full rounded-sm"}
						variant={"destructive"}
						disabled={isPending}
						onClick={handleRemove}
					>
						{isPending ? "Updating..." : "Remove"}
					</Button>
				</div>
			</Card>
		</motion.div>
	);
};

export default CartItem;
