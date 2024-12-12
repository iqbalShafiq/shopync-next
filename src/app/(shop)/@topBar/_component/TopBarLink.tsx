"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TopBarLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
}

const TopBarLink = ({ to, children, className }: TopBarLinkProps) => {
	const pathName = usePathname();
	return (
		<Link
			className={`py-2 px-6 flex-col justify-center content-center text-center text-slate-900 text-sm font-semibold transition-all duration-300 rounded-xl hover:rounded-2xl backdrop-blur-xl hover:backdrop-blur-2xl shadow-sm ${to === pathName ? "bg-slate-900 text-slate-100 hover:bg-slate-200 hover:text-slate-900" : "bg-slate-100"} hover:bg-slate-200 ${className}`}
			href={to}
		>
			{children}
		</Link>
	);
};

export default TopBarLink;
