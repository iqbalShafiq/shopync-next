"use client";

import Link from "next/link";
import TopBarLink from "@/app/(shop)/@topBar/_component/topBarLink";
import SearchBar from "@/app/(shop)/@topBar/_component/searchBar";
import { Button } from "@/components/ui/button";
import {
	ArrowRightStartOnRectangleIcon,
	Bars3Icon,
	ShoppingCartIcon,
	XMarkIcon,
} from "@heroicons/react/16/solid";
import React from "react";

const TopBar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	return (
		<nav className="mx-8 px-8 py-5 text-slate-900 bg-white/30 rounded-xl backdrop-blur-sm shadow-sm">
			{/* Main Navigation Container */}
			<div className="flex justify-between items-center">
				<div className={"block md:flex justify-start space-x-6 items-center"}>
					{/* Logo */}
					<Link href={"/"} className="text-slate-900">
						<h1 className="text-2xl font-semibold">~</h1>
					</Link>

					{/* Desktop Navigation Links */}
					<div className="hidden md:flex items-center space-x-6">
						<div className="flex items-center space-x-1">
							<TopBarLink href={"/products"}>Explore</TopBarLink>
							<TopBarLink href={"/products/mine"}>My Products</TopBarLink>
							<TopBarLink href={"/products/create"}>Add Product</TopBarLink>
						</div>
					</div>
				</div>

				{/* Desktop Right Section */}
				<div className="hidden md:flex items-center space-x-3">
					<SearchBar />
					<TopBarLink
						href={"/cart"}
						variant={"ghost"}
						size={"icon"}
						className="rounded-full"
					>
						<ShoppingCartIcon />
					</TopBarLink>
					<TopBarLink
						href={"/logout"}
						variant={"ghost"}
						size={"icon"}
						className="rounded-full"
					>
						<ArrowRightStartOnRectangleIcon />
					</TopBarLink>
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
				<div className="md:hidden mt-4 space-y-4">
					<div className="flex flex-col space-y-3">
						<TopBarLink href={"/products"}>Explore</TopBarLink>
						<TopBarLink href={"/products/mine"}>My Products</TopBarLink>
						<TopBarLink href={"/products/create"}>Add Product</TopBarLink>
					</div>
					<div className="py-3">
						<SearchBar />
					</div>
					<div className="flex space-x-3">
						<TopBarLink
							href={"/cart"}
							variant={"ghost"}
							size={"icon"}
							className="rounded-full"
						>
							<ShoppingCartIcon />
						</TopBarLink>
						<TopBarLink
							href={"/logout"}
							variant={"ghost"}
							size={"icon"}
							className="rounded-full"
						>
							<ArrowRightStartOnRectangleIcon />
						</TopBarLink>
					</div>
				</div>
			)}
		</nav>
	);
};

export default TopBar;
