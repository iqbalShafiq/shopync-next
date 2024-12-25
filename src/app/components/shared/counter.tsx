"use client";

import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

export type CounterProps = {
	start: number;
	min: number;
	max: number;
	increment: number;
	enabled: boolean;
	directEditEnabled: boolean;
	className?: string;
};

const Counter = ({
	start = 0,
	min = 0,
	max,
	className,
	increment = 1,
	directEditEnabled = true,
}: CounterProps) => {
	const [quantity, setQuantity] = React.useState(1);

	const handleIncrement = () => {
		setQuantity(quantity + increment);
	};

	const handleDecrement = () => {
		if (quantity > start) {
			setQuantity(quantity - increment);
		}
	};

	return (
		<div className={`flex items-center justify-start space-x-4 ${className}`}>
			<Button
				type={"button"}
				variant={"outline"}
				size={"icon"}
				className={"bg-transparent"}
				disabled={quantity === 1}
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
				disabled={quantity === max}
				onClick={handleIncrement}
			>
				<PlusIcon width={20} />
			</Button>
		</div>
	);
};

export default Counter;
