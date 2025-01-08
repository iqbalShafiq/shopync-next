import ImageViewer from "@/app/components/shared/imageViewer";
import LinkButton from "@/app/components/shared/linkButton";
import type { Seller } from "@/app/lib/services/products";
import { cn } from "@/lib/utils";

interface SellerCardProps {
	seller: Seller;
	className?: string;
}

const SellerCard = ({ seller, className }: SellerCardProps) => {
	return (
		<div className={cn("flex items-center space-x-0 sm:space-x-6", className)}>
			<ImageViewer
				src={
					"https://plus.unsplash.com/premium_photo-1667030474693-6d0632f97029?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
				alt={"User avatar"}
				className={"hidden h-16 w-16 rounded-full sm:block"}
			/>

			<div className={"flex flex-1 items-center justify-between"}>
				<div>
					<p className={"font-semibold text-md text-slate-900"}>
						{seller.name}
					</p>
					<p className={"font-light text-md text-slate-500"}>
						{seller.count.products} products
					</p>
				</div>

				<LinkButton
					variant={"default"}
					href={`/sellers/${seller.id}`}
					className={"font-semibold text-sm"}
				>
					View Profile
				</LinkButton>
			</div>
		</div>
	);
};

export default SellerCard;
