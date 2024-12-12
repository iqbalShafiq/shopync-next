import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface PaginationProps {
	endpoint: string;
	search?: string;
	limit: number;
	currentPage: number;
	totalPages: number;
}

export default function Pagination({
	endpoint,
	search = "",
	limit,
	currentPage,
	totalPages,
}: PaginationProps) {
	const createPageLink = (page: number) =>
		`${endpoint}?page=${page}&limit=${limit}&search=${search}`;

	const renderPageNumbers = () => {
		const pages = [];
		const maxPagesToShow = 5;
		const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

		if (totalPages <= maxPagesToShow) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= halfMaxPagesToShow) {
				for (let i = 1; i <= maxPagesToShow - 1; i++) {
					pages.push(i);
				}
				pages.push("...");
			} else if (currentPage > totalPages - halfMaxPagesToShow) {
				pages.push(1);
				pages.push("...");
				for (let i = totalPages - (maxPagesToShow - 2); i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push(1);
				pages.push("...");
				for (
					let i = currentPage - halfMaxPagesToShow + 1;
					i <= currentPage + halfMaxPagesToShow - 1;
					i++
				) {
					pages.push(i);
				}
				pages.push("...");
			}
		}

		return pages.map((page, index) =>
			typeof page === "number" ? (
				<Link
					key={page}
					href={createPageLink(page)}
					aria-current={currentPage === page ? "page" : undefined}
					className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page ? "bg-slate-600 text-white" : "text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"} focus:z-20 focus:outline-offset-0`}
				>
					{page}
				</Link>
			) : (
				<span
					key={page}
					className={
						"relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 focus:z-20 focus:outline-offset-0"
					}
				>
					{page}
				</span>
			),
		);
	};

	return (
		<div className="flex items-center justify-between border-t mt-12 px-4 pt-8 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<Link
					href={createPageLink(currentPage - 1)}
					className={`relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
				>
					Previous
				</Link>
				<Link
					href={createPageLink(currentPage + 1)}
					className={`relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
				>
					Next
				</Link>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-slate-700">
						Showing{" "}
						<span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
						<span className="font-medium">
							{Math.min(currentPage * 10, totalPages * 10)}
						</span>{" "}
						of <span className="font-medium">{totalPages * 10}</span> results
					</p>
				</div>
				<div>
					<nav
						aria-label="Pagination"
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
					>
						<Link
							href={createPageLink(currentPage - 1)}
							className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon aria-hidden="true" className="size-5" />
						</Link>
						{renderPageNumbers()}
						<Link
							href={createPageLink(currentPage + 1)}
							className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon aria-hidden="true" className="size-5" />
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}
