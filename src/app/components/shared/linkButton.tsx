"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
}

const LinkButton = ({
	variant = "link",
	size = "default",
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
				className={`${pathName === href && "font-semibold"} ${className}`}
				tabIndex={-1}
				size={size}
			>
				{children}
			</Button>
		</Link>
	);
};

export default LinkButton;
