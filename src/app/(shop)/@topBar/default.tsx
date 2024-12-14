import type React from "react";
import Link from "next/link";
import {
	ArrowRightStartOnRectangleIcon,
	ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import SearchBar from "@/app/(shop)/@topBar/_component/SearchBar";

const DefaultTopBar = () => {
	return (
		<div
			className={
				"mx-8 px-8 py-5 text-slate-900 bg-white/30 rounded-xl space-x-16 flex justify-between items-center backdrop-blur-sm shadow-sm"
			}
		>
			<Link href={"/"} className={"font-semibold text-slate-900 text-2xl"}>
				Shopync
			</Link>
			<div className={"flex space-x-3 items-center"}>
				<SearchBar />
				<Button>
					<Link href={"/products/create"}>Add Product</Link>
				</Button>
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
