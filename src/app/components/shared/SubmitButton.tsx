"use client";
import { Button } from "@/app/components/shared/Button";
import { useFormStatus } from "react-dom";
import type React from "react";

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
			className={className}
			type="submit"
			variant="primary"
			disabled={pending}
		>
			{pending ? loadingText : text}
		</Button>
	);
}

export default SubmitButton;
