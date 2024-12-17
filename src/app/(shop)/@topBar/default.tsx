import type React from "react";
import Link from "next/link";
import {
	ArrowRightStartOnRectangleIcon,
	ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import SearchBar from "@/app/(shop)/@topBar/_component/SearchBar";
import TopBarLink from "@/app/(shop)/@topBar/_component/TopBarLink";
import { authService } from "@/app/lib/services/auth";
import { hasErrorResult } from "@/app/lib/utils";

const DefaultTopBar = async () => {
	const user = await authService.me();

	console.log(`user: ${JSON.stringify(user)}`);

	if (hasErrorResult(user)) {
		throw new Error("User not found");
	}

	return (
		<div
			className={
				"mx-8 px-8 py-5 text-slate-900 bg-white/30 rounded-xl space-x-16 flex justify-between items-center backdrop-blur-sm shadow-sm"
			}
		>
			<div className={"flex justify-start items-center space-x-6"}>
				<Link href={"/"} className={"text-slate-900"}>
					<h1 className={"text-2xl font-semibold "}>Shopync</h1>
				</Link>
				<div className={"flex justify-start items-center space-x-1"}>
					<TopBarLink href={"/products"}>Explore</TopBarLink>
					<TopBarLink href={`/products?userId=${user.data.id}`}>
						My Products
					</TopBarLink>
					<TopBarLink href={"/products/mine/create"}>Add Product</TopBarLink>
				</div>
			</div>
			<div className={"flex space-x-3 items-center"}>
				<SearchBar />
				<Link
					href={"/cart"}
					className={
						"flex-col content-center text-slate-900 hover:text-slate-700 transition-all duration-300"
					}
				>
					<Button variant={"ghost"} size={"icon"} className={"rounded-full"}>
						<ShoppingCartIcon width={20} />
					</Button>
				</Link>
				<Button variant={"ghost"} size={"icon"} className={"rounded-full"}>
					<Link href={"/logout"}>
						<ArrowRightStartOnRectangleIcon />
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default DefaultTopBar;
