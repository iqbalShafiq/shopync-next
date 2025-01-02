"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { cn } from "@/lib/utils";

interface LinkButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	variant?:
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| null
		| undefined;
	size?: "default" | "sm" | "lg" | "icon" | null | undefined;
	disabled?: boolean;
}

const LinkButton = ({
	variant = "link",
	size = "default",
	disabled = false,
	href,
	children,
	className,
}: LinkButtonProps) => {
	const pathName = usePathname();
	if (!href) return null;

	return (
		<Link href={href}>
			<Button
				variant={variant}
				className={cn(
					"rounded-sm",
					`${pathName === href ? "font-medium" : "font-light"}`,
					className,
				)}
				tabIndex={-1}
				size={size}
				disabled={disabled}
			>
				{children}
			</Button>
		</Link>
	);
};

export default LinkButton;
