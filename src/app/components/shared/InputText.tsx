import type React from "react";

const defaultClass =
	"mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	className?: string;
}

const InputText = ({ className, ...props }: InputProps) => {
	return (
		<div className={"mb-4"}>
			<label
				htmlFor={props.id}
				className={"block text-sm font-medium text-slate-900"}
			>
				{props.label}
			</label>
			<input className={`${defaultClass} ${className}`} {...props} />
		</div>
	);
};

export default InputText;
