"use client";

import { Button } from "@/components/ui/button";

const ErrorProduct = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<main className="flex h-full flex-col items-center justify-center">
			<h2 className="text-center">{error.message}</h2>
			<Button
				type={"button"}
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
				onClick={() => reset()}
			>
				Try again
			</Button>
		</main>
	);
};

export default ErrorProduct;
