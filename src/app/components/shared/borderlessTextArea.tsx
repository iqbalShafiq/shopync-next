import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type React from "react";

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
			<AutosizeTextarea
				className={cn(
					"mt-2 block w-full rounded-lg border-2 border-slate-200 bg-transparent px-4 py-3 transition-all duration-150 focus-visible:my-2 focus-visible:rounded-lg focus-visible:p-3 focus-visible:ring-2",
					className,
				)}
				{...props}
			/>
		</div>
	);
};

export default BorderlessTextArea;
