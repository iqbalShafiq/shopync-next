import type { Product } from "@/app/lib/services/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductDetailProps {
	product: Product;
}

interface AddToCartProps {
	product: Product;
	className?: string;
}

const AddToCart = ({ product, className }: AddToCartProps) => {
	return (
		<aside>
			<Card
				className={`rounded-xl p-4 bg-transparent border-1 border-slate-900 ${className}`}
			>
				<h3 className={"text-xl font-semibold"}>Add to Cart</h3>
				<div className={"flex space-x-2"}>
					<Button type={"button"} variant={"link"} size={"icon"}>
						<MinusIcon width={20} />
					</Button>
					<p className={"text-xl font-semibold text-slate-900"}>1</p>
					<Button type={"button"} variant={"link"} size={"icon"}>
						<PlusIcon width={20} />
					</Button>
				</div>
				<p className={"text-lg text-slate-500"}>{product.name}</p>
				<p className={"text-xl font-semibold mt-4"}>{product.price}</p>
				<Button
					className={
						"bg-slate-900 text-white font-semibold px-4 py-2 rounded-md mt-4"
					}
				>
					Add to Cart
				</Button>
			</Card>
		</aside>
	);
};

const ProductDetail = ({ product }: ProductDetailProps) => {
	return (
		<div className={"w-full grid-cols-1 gap-4 grid md:grid-cols-3 md:gap-4"}>
			<div className={"col-span-1"}>
				<img
					src={
						'https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"'
					}
					alt={product.name}
					className={"w-full h-full object-cover object-center"}
				/>
			</div>
			<div className={"col-span-1"}>
				<h1 className={"text-2xl font-semibold"}>{product.name}</h1>
				<p className={"text-lg text-slate-500"}>{product.description}</p>
				<p className={"text-xl font-semibold mt-4"}>{product.price}</p>
			</div>
			<AddToCart product={product} className={"col-span-1"} />
		</div>
	);
};

export default ProductDetail;
