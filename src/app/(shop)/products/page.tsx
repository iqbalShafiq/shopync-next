import ProductItem from "@/app/(shop)/products/_component/ProductItem";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";

export default async function Products(props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		limit?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const search = searchParams?.search || "";
	const page = Number(searchParams?.page) || 0;
	const limit = Number(searchParams?.limit) || 1;

	const products = await productService.getAll({
		search,
		limit,
		page: page - 1,
	});

	if (hasErrorResult(products)) {
		return (
			<div>
				<h1 className={"text-xl font-semibold text-slate-900"}>Products</h1>
				<p>{products.message}</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className={"text-xl font-semibold text-slate-900"}>Products</h1>
			<div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{products.data.map(({ id, name, price, description, quantity }) => (
					<ProductItem
						key={id}
						id={id}
						name={name}
						description={description}
						price={price}
						quantity={quantity}
						image={
							"https://images.unsplash.com/photo-1719937206158-cad5e6775044?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
					/>
				))}
			</div>
			<Pagination className={"mt-8"}>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href={`?page=${page}`}
							aria-disabled={page === 1}
							tabIndex={page <= 1 ? -1 : undefined}
							className={
								page <= 1 ? "pointer-events-none opacity-50" : undefined
							}
						/>
					</PaginationItem>
					{Array.from(
						{ length: products.pagination.totalPages },
						(_, index) => (
							<PaginationItem key={Math.random()}>
								<PaginationLink href={`?page=${index + 1}`}>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						),
					)}
					<PaginationItem>
						<PaginationNext
							href={`?page=${page}`}
							aria-disabled={page === products.pagination.totalPages - 1}
							tabIndex={page >= (products.pagination.totalPages - 1) ? -1 : undefined}
							className={
								page >= products.pagination.totalPages - 1
									? "pointer-events-none opacity-50"
									: undefined
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
