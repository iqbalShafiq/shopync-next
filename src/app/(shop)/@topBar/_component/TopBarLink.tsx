"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const TopBarLink = ({
	href,
	children,
	className,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
	const pathName = usePathname();

	if (!href) return null;

	return (
		<Link href={href}>
			<Button
				variant={"link"}
				className={`${pathName === href && "font-semibold"} ${className}`}
			>
				{children}
			</Button>
		</Link>
	);
};

export default TopBarLink;
