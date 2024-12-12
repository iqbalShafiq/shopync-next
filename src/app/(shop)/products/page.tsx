import ProductItem from "@/app/(shop)/products/_component/ProductItem";
import Pagination from "@/app/(shop)/_component/Pagination";

export default async function Products() {
	return (
		<div>
			<h1 className={"text-xl font-semibold text-slate-900"}>Products</h1>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				<ProductItem
					id={"asd"}
					name={"Laptop"}
					description={"lore ipsum"}
					price={1500000}
					image={
						"https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
				/>
			</div>
			<Pagination
				currentPage={1}
				totalPages={10}
				limit={10}
				endpoint={"/products"}
			/>
		</div>
	);
}
