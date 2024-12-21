import type React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const defaultClass =
	"block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	startIcon?: React.ReactNode;
}

const InputText = ({ startIcon, className, ...props }: InputProps) => {
	return (
		<div className={"relative"}>
			{props.label && (
				<Label
					htmlFor={props.id}
					className={"block text-sm font-medium text-slate-900"}
				>
					{props.label}
				</Label>
			)}
			{startIcon && (
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					{startIcon}
				</div>
			)}
			<Input
				className={`${defaultClass} ${startIcon && "pl-10"} ${className}`}
				{...props}
			/>
		</div>
	);
};

export default InputText;
