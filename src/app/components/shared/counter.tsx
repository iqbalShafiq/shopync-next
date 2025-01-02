"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

export type CounterProps = {
	quantity: number;
	stock: number;
	increment: number;
	enabled: boolean;
	handleIncrement: () => void;
	handleDecrement: () => void;
	isPending: boolean;
	className?: string;
};

const Counter = ({
	quantity = 0,
	stock,
	handleIncrement,
	handleDecrement,
	isPending,
	className,
}: CounterProps) => {
	return (
		<div className={cn("flex items-center justify-start space-x-4", className)}>
			<Button
				type={"button"}
				variant={"outline"}
				size={"icon"}
				className={`bg-transparent ${
					isPending ? "cursor-not-allowed opacity-50" : ""
				}`}
				disabled={quantity === 1 || isPending}
				onClick={handleDecrement}
			>
				<MinusIcon width={20} />
			</Button>
			<p className={"select-none font-semibold text-slate-900 text-xl"}>
				{quantity}
			</p>
			<Button
				type={"button"}
				variant={"default"}
				size={"icon"}
				disabled={quantity === stock}
				onClick={handleIncrement}
				className={isPending ? "cursor-not-allowed opacity-50" : ""}
			>
				<PlusIcon width={20} />
			</Button>
		</div>
	);
};

export default Counter;
