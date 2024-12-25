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
		<div className={"bg-blue-100 py-8"}>
			{modal}
			{topBar}
			<div
				className={
					"mx-8 mt-6 rounded-xl bg-white/30 p-8 text-slate-900 shadow-sm backdrop-blur-sm"
				}
			>
				{children}
			</div>
		</div>
	);
}
