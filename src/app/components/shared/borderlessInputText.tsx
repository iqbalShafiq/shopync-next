import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";
import { cn } from "@/lib/utils";

interface BorderlessInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	labelFontWeight?: "normal" | "medium" | "semibold" | "bold";
	className?: string;
}

const BorderlessInputText = ({
	label,
	labelFontWeight,
	className,
	...props
}: BorderlessInputProps) => {
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
			<Input
				className={cn(
					"-p-4 rounded-none border-slate-200 border-x-0 border-t-0 border-b-2 bg-transparent font-medium text-slate-800 transition-all duration-150 focus-visible:my-2 focus-visible:rounded-lg focus-visible:p-3 focus-visible:ring-2",
					className,
				)}
				{...props}
			/>
		</div>
	);
};

export default BorderlessInputText;
