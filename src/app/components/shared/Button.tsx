import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {cn} from "@/app/lib/utils";

const buttonVariants = cva(
	"w-full font-semibold py-2 rounded-md transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900",
	{
		variants: {
			variant: {
				primary: "bg-slate-900 text-white hover:bg-slate-800",
				secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
);

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	className?: string;
}

const Button = ({ className, variant, children, ...props }: ButtonProps) => {
	return (
		<button className={cn(buttonVariants({ variant, className }))} {...props}>
			{children}
		</button>
	);
};

export { Button, buttonVariants };
