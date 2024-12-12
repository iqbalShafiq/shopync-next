import "../globals.css";
import type React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={"h-screen justify-center flex items-center bg-blue-100"}>
			<div
				className={
					"p-8 text-slate-900 bg-white/30 rounded-2xl flex justify-center items-center backdrop-blur-sm shadow-lg"
				}
			>
				<div className={"md:w-96"}>
					{children}
				</div>
			</div>
		</div>
	);
}
