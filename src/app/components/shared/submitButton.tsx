"use client";
import { useFormStatus } from "react-dom";
import type React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	text: string;
	loadingText: string;
}

function SubmitButton({ className, text, loadingText }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return (
		<Button
			className={cn("rounded-sm", className)}
			type="submit"
			disabled={pending}
		>
			{pending ? loadingText : text}
		</Button>
	);
}

export default SubmitButton;
