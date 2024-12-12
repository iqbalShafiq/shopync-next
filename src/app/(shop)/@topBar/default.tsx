import type React from "react";
import Link from "next/link";
import TopBarLink from "@/app/(shop)/@topBar/_component/TopBarLink";
import {
	MagnifyingGlassIcon,
	ShoppingCartIcon,
} from "@heroicons/react/16/solid";
import InputText from "@/app/components/shared/InputText";

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
			<form className={"w-1/2 flex-col content-center"}>
				<InputText
					placeholder={"Search Products"}
					name={"search"}
					className={"rounded-3xl bg-white/30"}
					startIcon={
						<MagnifyingGlassIcon
							width={20}
							height={20}
							className="text-slate-900"
						/>
					}
				/>
			</form>
			<div className={"flex space-x-6"}>
				<TopBarLink
					to={"/cart"}
					className={
						"px-4 py-3 flex-col content-center text-slate-900 hover:text-slate-700 transition-all duration-300"
					}
				>
					<ShoppingCartIcon width={20} />
				</TopBarLink>
				<TopBarLink
					to={"/logout"}
					className={
						"flex-col content-center bg-slate-900 text-slate-200 hover:bg-slate-200 hover:text-slate-900"
					}
				>
					Add Product
				</TopBarLink>
				<TopBarLink to={"/logout"} className={"flex-col content-center"}>
					Logout
				</TopBarLink>
			</div>
		</div>
	);
};

export default DefaultTopBar;
