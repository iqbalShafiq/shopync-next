import "../globals.css";
import type React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={"flex h-screen items-center justify-center bg-white"}>
			<div
				className={
					"flex items-center justify-center rounded-md p-8 text-slate-900 shadow-md"
				}
			>
				<div className={"md:w-96"}>{children}</div>
			</div>
		</div>
	);
}
