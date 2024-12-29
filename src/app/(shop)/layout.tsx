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
		<div className={"relative flex min-h-screen flex-col bg-blue-100 pb-8"}>
			{modal}
			{topBar}
			<div
				className={
					"relative mx-8 mt-8 flex flex-1 flex-col rounded-lg bg-white/30 p-8 text-slate-900 shadow-sm backdrop-blur-sm md:mt-28"
				}
			>
				{children}
			</div>
		</div>
	);
}
