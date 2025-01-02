import type React from "react";

interface ShopLayoutProps {
	children: React.ReactNode;
	topBar: React.ReactNode;
	modal: React.ReactNode;
	footer: React.ReactNode;
}

export default function ShopLayout({
	children,
	topBar,
	modal,
	footer,
}: ShopLayoutProps) {
	return (
		<div className={"relative flex min-h-screen flex-col bg-white"}>
			{modal}
			{topBar}
			<div
				className={
					"relative m-8 flex flex-1 flex-col rounded-lg text-slate-900 md:mt-24"
				}
			>
				{children}
			</div>
			{footer}
		</div>
	);
}
