import type React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface BorderlessTextAreaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	labelFontWeight?: "normal" | "medium" | "semibold" | "bold";
	startIcon?: React.ReactNode;
}

const BorderlessTextArea = ({
	label,
	labelFontWeight = "medium",
	className,
	...props
}: BorderlessTextAreaProps) => {
	return (
		<div>
			{label && (
				<Label
					htmlFor={props.id}
					className={`block text-sm font-${labelFontWeight} text-slate-900`}
				>
					{label}
				</Label>
			)}
			<Textarea
				className={`mt-2 px-4 py-2 block transition-all duration-150 w-full rounded-lg border-2 border-slate-200 resize-none bg-transparent focus-visible:rounded-lg focus-visible:p-3 focus-visible:ring-2 focus-visible:my-2 ${className}`}
				{...props}
			/>
		</div>
	);
};

export default BorderlessTextArea;
