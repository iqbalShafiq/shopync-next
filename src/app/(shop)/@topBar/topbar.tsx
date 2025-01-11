"use client";

import SearchBar from "@/app/(shop)/@topBar/_component/searchBar";
import LinkButton from "@/app/components/shared/linkButton";
import {
	ArrowRightStartOnRectangleIcon,
	Bars3Icon,
	ShoppingCartIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

const TopBar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	return (
		<nav className="z-50 w-full bg-white px-8 py-3 text-slate-900 shadow-sm md:fixed md:top-0">
			{/* Main Navigation Container */}
			<div className="flex items-center justify-between">
				<div className={"block items-center justify-start space-x-6 md:flex"}>
					{/* Logo */}
					<Link href={"/"} className="text-slate-900">
						<h1 className="font-semibold text-2xl">Shopync</h1>
					</Link>

					{/* Desktop Navigation Links */}
					<div className="hidden items-center space-x-6 md:flex">
						<div className="flex items-center space-x-1">
							<LinkButton href={"/products"}>Explore</LinkButton>
							<LinkButton href={"/products/mine"}>My Products</LinkButton>
							<LinkButton href={"/products/editor"}>Add Product</LinkButton>
						</div>
					</div>
				</div>

				{/* Desktop Right Section */}
				<div className="hidden items-center space-x-3 md:flex">
					<SearchBar />
					<LinkButton
						href={"/cart"}
						variant={"ghost"}
						size={"icon"}
						className="rounded-full"
					>
						<ShoppingCartIcon />
					</LinkButton>
					<LinkButton
						href={"/logout"}
						variant={"ghost"}
						size={"icon"}
						className="rounded-full"
					>
						<ArrowRightStartOnRectangleIcon />
					</LinkButton>
				</div>

				{/* Mobile Menu Button */}
				<button
					type={"button"}
					className="md:hidden"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? (
						<XMarkIcon className="h-6 w-6" />
					) : (
						<Bars3Icon className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="mt-4 space-y-4 md:hidden">
					<div className="flex flex-col space-y-3">
						<LinkButton href={"/products"}>Explore</LinkButton>
						<LinkButton href={"/products/mine"}>My Products</LinkButton>
						<LinkButton href={"/products/editor"}>Add Product</LinkButton>
					</div>
					<div className="py-3">
						<SearchBar />
					</div>
					<div className="flex space-x-3">
						<LinkButton
							href={"/cart"}
							variant={"ghost"}
							size={"icon"}
							className="rounded-full"
						>
							<ShoppingCartIcon />
						</LinkButton>
						<LinkButton
							href={"/logout"}
							variant={"ghost"}
							size={"icon"}
							className="rounded-full"
						>
							<ArrowRightStartOnRectangleIcon />
						</LinkButton>
					</div>
				</div>
			)}
		</nav>
	);
};

export default TopBar;
