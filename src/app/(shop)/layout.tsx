import type React from "react";

interface ShopLayoutProps {
	children: React.ReactNode;
	topBar: React.ReactNode;
	modal: React.ReactNode;
}

export default function ShopLayout({
	children,
	topBar,
	modal,
}: ShopLayoutProps) {
	return (
		<div className={"py-8 bg-blue-100"}>
			{modal}
			{topBar}
			<div
				className={
					"mt-6 mx-8 p-8 text-slate-900 bg-white/30 rounded-xl backdrop-blur-sm shadow-sm"
				}
			>
				{children}
			</div>
		</div>
	);
}
