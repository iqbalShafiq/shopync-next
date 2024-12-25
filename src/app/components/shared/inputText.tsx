import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type React from "react";

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
					className={"block font-medium text-slate-900 text-sm"}
				>
					{props.label}
				</Label>
			)}
			{startIcon && (
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
