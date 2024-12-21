import type React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
				className={`-p-4 border-t-0 border-x-0 border-b-2 border-slate-200 font-medium text-slate-800 rounded-none bg-transparent focus-visible:rounded-lg focus-visible:p-3 focus-visible:ring-2 focus-visible:my-2 transition-all duration-150 ${className}`}
				{...props}
			/>
		</div>
	);
};

export default BorderlessInputText;
