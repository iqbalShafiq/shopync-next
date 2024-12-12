import type React from "react";

const defaultClass =
	"block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	startIcon?: React.ReactNode;
}

const InputText = ({
	startIcon,
	className,
	...props
}: InputProps) => {
	return (
		<div className={"relative"}>
			{props.label && (
				<label
					htmlFor={props.id}
					className={"block text-sm font-medium text-slate-900"}
				>
					{props.label}
				</label>
			)}
			{startIcon && (
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					{startIcon}
				</div>
			)}
			<input
				className={`${startIcon && "pl-10"} ${defaultClass} ${className}`}
				{...props}
			/>
		</div>
	);
};

export default InputText;
