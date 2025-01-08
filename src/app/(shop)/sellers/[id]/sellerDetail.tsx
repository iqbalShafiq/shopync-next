import Products from "@/app/(shop)/products/products";
import ImageViewer from "@/app/components/shared/imageViewer";
import type { Product, Seller } from "@/app/lib/services/products";
import type { PaginatedResult } from "@/app/lib/types";
import React from "react";

interface SellerDetailProps {
	productResult: PaginatedResult<Product>;
	seller: Seller | null | undefined;
}

const SellerDetail = ({ productResult, seller }: SellerDetailProps) => {
	const totalItems = productResult.pagination.totalItems;

	return (
		<div className={"flex flex-col"}>
			<h1 className={"w-full text-center font-semibold text-slate-900 text-xl"}>
				Seller Profile
			</h1>
			<div
				className={
					"mt-5 flex w-full flex-col items-center justify-center space-y-4"
				}
			>
				<ImageViewer
					src={
						"https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					alt={"User avatar"}
					className={"h-32 w-32 rounded-full"}
				/>
				<div className={"flex flex-col items-center justify-center space-y-1"}>
					<h1 className={"font-medium text-slate-900"}>{seller?.name}</h1>
					<p className={"font-light text-slate-800 text-sm"}>
						Total Products: {totalItems}
					</p>
				</div>
			</div>
			<div className={"my-6 h-0.5 border-t bg-gray-50"} />
			<Products userId={seller?.id} title={`Products by ${seller?.name}`} />
		</div>
	);
};

export default SellerDetail;
