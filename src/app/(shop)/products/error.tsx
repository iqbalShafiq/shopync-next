"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const ErrorProduct = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<motion.main className="flex flex-1 flex-col items-center justify-center">
			<h2 className="text-center font-semibold text-red-500">
				{error.message}
			</h2>
			<Button
				type={"button"}
				className={"mt-3 rounded-sm"}
				onClick={() => reset()}
			>
				Try again
			</Button>
		</motion.main>
	);
};

export default ErrorProduct;
