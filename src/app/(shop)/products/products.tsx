import ProductGrid from "@/app/(shop)/products/_component/productGrid";
import ProductItem from "@/app/(shop)/products/_component/productItem";
import { getUser } from "@/app/lib/context/AuthContext";
import { productService } from "@/app/lib/services/products";
import { hasErrorResult } from "@/app/lib/utils";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { LucideSearchX } from "lucide-react";

export default async function Products(props: {
	searchParams?: Promise<{
		search?: string;
		page?: string;
		limit?: string;
	}>;
	pagination?: boolean;
	title?: string;
	mine?: boolean;
	userId?: string;
	excludedProductId?: string;
}) {
	const searchParams = await props.searchParams;
	const search = searchParams?.search || "";
	const page = Number(searchParams?.page) || 1;
	const limit = Number(searchParams?.limit) || 10;
	const userId = props.userId || undefined;
	const excludedProductId = props.excludedProductId || undefined;
	const title = props.title
		? props.title
		: props.mine
			? "My Products"
			: "Products";
	const pagination = props.pagination !== undefined ? props.pagination : true;

	const user = await getUser();

	const products = await productService.get({
		search,
		limit,
		page: page - 1,
		userId,
		excludedProductId,
	});

	if (hasErrorResult(user)) {
		throw new Error(user.message);
	}

	if (hasErrorResult(products)) {
		throw new Error(products.message);
	}

	if (
		products?.data?.length === 0 ||
		products?.pagination?.totalPages === undefined
	) {
		return (
			<div className={"flex flex-1 flex-col"}>
				{search && (
					<div>
						<h1 className={"font-semibold text-slate-900 text-xl"}>{title}</h1>
						<p className={"mt-1 font-light text-slate-500 text-sm"}>
							Search results for: {search}
						</p>
					</div>
				)}
				<div
					className={
						"mt-4 flex flex-1 flex-col items-center justify-center text-red-500 opacity-50"
					}
				>
					<div>
						<LucideSearchX className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
					</div>
					<p className={"mt-3 font-semibold text-xs md:text-sm"}>
						No products found
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={"flex flex-1 flex-col"}>
			<h1 className={"font-semibold text-slate-900 text-xl"}>{title}</h1>
			{search && (
				<p className={"mt-1 font-light text-slate-500 text-sm"}>
					Search results for: {search}
				</p>
			)}
			<ProductGrid>
				{products.data.map(
					({ id, name, price, description, quantity, userId, imageUrl }) => (
						<ProductItem
							key={id}
							id={id}
							name={name}
							description={description}
							price={price}
							quantity={quantity}
							mine={userId === user?.data.id}
							image={`http://localhost:8000${imageUrl}`}
						/>
					),
				)}
			</ProductGrid>
			{pagination && (
				<Pagination
					className={"mt-8 flex flex-1 flex-col items-center justify-end"}
				>
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
								tabIndex={
									page >= products.pagination.totalPages ? -1 : undefined
								}
								className={
									page >= products.pagination.totalPages
										? "pointer-events-none opacity-50"
										: undefined
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			)}
		</div>
	);
}
