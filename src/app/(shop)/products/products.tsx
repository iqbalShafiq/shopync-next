import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import ProductItem from "@/app/(shop)/products/_component/productItem";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default async function Products(props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		limit?: string;
	}>;
	mine?: boolean;
	userId?: string;
}) {
	const searchParams = await props.searchParams;
	const search = searchParams?.search || "";
	const page = Number(searchParams?.page) || 1;
	const limit = Number(searchParams?.limit) || 10;
	const userId = props.userId || undefined;
	const title = props.mine ? "My Products" : "Products";

	console.log(`mine: ${props.mine}`);

	const products = await productService.get({
		search,
		limit,
		page: page - 1,
		userId,
	});

	if (hasErrorResult(products)) {
		return (
			<div>
				<h1 className={"text-xl font-semibold text-slate-900"}>{title}</h1>
				<p>{products.message}</p>
			</div>
		);
	}

	console.log(`products: ${JSON.stringify(products)}`);

	if (
		products?.data?.length === 0 ||
		products?.pagination?.totalPages === undefined
	) {
		return (
			<div>
				<h1 className={"text-xl font-semibold text-slate-900"}>{title}</h1>
				<p className={"text-red-500 mt-4"}>No products found</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className={"text-xl font-semibold text-slate-900"}>{title}</h1>
			<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
							href={`?page=${page - 1}`}
							aria-disabled={page === 1}
							tabIndex={page <= 1 ? -1 : undefined}
							className={
								page <= 1 ? "pointer-events-none opacity-50" : undefined
							}
						/>
					</PaginationItem>
					{Array.from(
						{ length: products?.pagination?.totalPages },
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
							href={`?page=${page + 1}`}
							aria-disabled={page === products.pagination.totalPages}
							tabIndex={page >= products.pagination.totalPages ? -1 : undefined}
							className={
								page >= products.pagination.totalPages
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
