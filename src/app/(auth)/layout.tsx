import "../globals.css";
import type React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={"flex·h-screen·items-center·justify-center·bg-blue-100"}>
			<div
				className={
					"flex·items-center·justify-center·rounded-2xl·bg-white/30·p-8·text-slate-900·shadow-lg·backdrop-blur-sm"
				}
			>
				<div className={"md:w-96"}>{children}</div>
			</div>
		</div>
	);
}
