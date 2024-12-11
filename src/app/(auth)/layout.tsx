import "../globals.css";
import type React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={"h-screen justify-center flex items-center bg-slate-200"}>
			{children}
		</div>
	);
}
