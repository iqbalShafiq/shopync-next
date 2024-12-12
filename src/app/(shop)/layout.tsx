import type React from "react";

interface ShopLayoutProps {
	children: React.ReactNode;
	topBar: React.ReactNode;
}

export default function ShopLayout({ children, topBar }: ShopLayoutProps) {
	return (
		<div className={"py-8 bg-blue-100"}>
			{topBar}
			<div
				className={
					"h-screen mt-6 mx-8 p-8 text-slate-900 bg-white/30 rounded-xl backdrop-blur-sm shadow-sm"
				}
			>
				{children}
			</div>
		</div>
	);
}
